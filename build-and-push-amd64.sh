#!/bin/bash

# 在本地构建AMD64镜像并推送到阿里云

set -e

REGISTRY="crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms"
IMAGE_TAG="investment-v1-amd64"
FULL_IMAGE_NAME="${REGISTRY}:${IMAGE_TAG}"

echo "=========================================="
echo "在本地构建AMD64镜像并推送"
echo "=========================================="
echo ""

# 检查是否在项目目录
if [ ! -f "package.json" ]; then
    echo "错误：请在项目根目录执行此脚本"
    exit 1
fi

# 1. 创建或使用buildx构建器
echo "1. 设置buildx构建器..."
docker buildx create --name multiarch --use 2>/dev/null || docker buildx use multiarch
echo "✓ buildx构建器就绪"

# 2. 登录阿里云镜像仓库
echo ""
echo "2. 登录阿里云镜像仓库..."
echo "请输入密码："
docker login --username=sunce@sharingtea.com ${REGISTRY}
if [ $? -eq 0 ]; then
    echo "✓ 登录成功"
else
    echo "✗ 登录失败"
    exit 1
fi

# 3. 构建AMD64镜像并推送
echo ""
echo "3. 构建AMD64镜像并推送到阿里云..."
docker buildx build --platform linux/amd64 \
  --push \
  -t ${FULL_IMAGE_NAME} \
  .

if [ $? -eq 0 ]; then
    echo "✓ 镜像构建并推送成功"
else
    echo "✗ 构建失败"
    exit 1
fi

# 4. 验证推送
echo ""
echo "4. 验证镜像推送..."
docker pull ${FULL_IMAGE_NAME} > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✓ 镜像推送验证成功"
else
    echo "⚠ 验证失败，但镜像可能已推送"
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

