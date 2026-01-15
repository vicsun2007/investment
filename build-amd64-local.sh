#!/bin/bash

# 在本地构建AMD64镜像（使用国内镜像源）

set -e

REGISTRY="crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms"
IMAGE_TAG="investment-v1-amd64"
FULL_IMAGE_NAME="${REGISTRY}:${IMAGE_TAG}"

echo "=========================================="
echo "在本地构建AMD64镜像（使用国内镜像源）"
echo "=========================================="
echo ""

# 检查是否在项目目录
if [ ! -f "package.json" ]; then
    echo "错误：请在项目根目录执行此脚本"
    exit 1
fi

# 方法1: 先尝试拉取基础镜像
echo "方法1: 尝试拉取基础镜像..."
MIRRORS=(
    "hub.c.163.com/library/node:18-alpine"
    "dockerhub.azk8s.cn/library/node:18-alpine"
    "ccr.ccs.tencentyun.com/library/node:18-alpine"
)

SUCCESS=false
for mirror in "${MIRRORS[@]}"; do
    echo "尝试: $mirror"
    if docker pull "$mirror" 2>/dev/null; then
        echo "✓ 拉取成功: $mirror"
        docker tag "$mirror" node:18-alpine
        echo "✓ 已tag为node:18-alpine"
        SUCCESS=true
        break
    else
        echo "✗ 拉取失败: $mirror"
    fi
done

if [ "$SUCCESS" = false ]; then
    echo ""
    echo "方法2: 使用修改后的Dockerfile（使用国内镜像源）..."
    # 使用带镜像源的Dockerfile
    if [ -f "Dockerfile.mirror" ]; then
        cp Dockerfile Dockerfile.backup
        cp Dockerfile.mirror Dockerfile
        echo "✓ 已切换到使用国内镜像源的Dockerfile"
    else
        echo "✗ 未找到Dockerfile.mirror，手动修改Dockerfile"
        exit 1
    fi
fi

# 创建或使用buildx构建器
echo ""
echo "设置buildx构建器..."
docker buildx create --name multiarch --use 2>/dev/null || docker buildx use multiarch
echo "✓ buildx构建器就绪"

# 登录阿里云镜像仓库
echo ""
echo "登录阿里云镜像仓库..."
echo "请输入密码："
docker login --username=sunce@sharingtea.com ${REGISTRY}
if [ $? -eq 0 ]; then
    echo "✓ 登录成功"
else
    echo "✗ 登录失败"
    exit 1
fi

# 构建AMD64镜像并推送
echo ""
echo "构建AMD64镜像并推送到阿里云..."
docker buildx build --platform linux/amd64 \
  --push \
  -t ${FULL_IMAGE_NAME} \
  .

if [ $? -eq 0 ]; then
    echo "✓ 镜像构建并推送成功"
    
    # 恢复原Dockerfile
    if [ -f "Dockerfile.backup" ]; then
        mv Dockerfile.backup Dockerfile
        echo "✓ 已恢复原Dockerfile"
    fi
else
    echo "✗ 构建失败"
    exit 1
fi

echo ""
echo "=========================================="
echo "完成！"
echo "=========================================="
echo ""
echo "镜像地址: ${FULL_IMAGE_NAME}"
echo ""
echo "在ECS上执行："
echo "1. docker login --username=sunce@sharingtea.com ${REGISTRY}"
echo "2. docker pull ${FULL_IMAGE_NAME}"
echo "3. docker run -d --name investment -p 8082:8082 --restart=always ${FULL_IMAGE_NAME}"
echo ""

