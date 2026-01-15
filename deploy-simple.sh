#!/bin/bash

# 方案1部署脚本 - 直接使用端口访问
# 此方案不影响现有服务，最简单安全

set -e

REGISTRY="crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms"
IMAGE_NAME="investment"
VERSION="v1"
FULL_IMAGE_NAME="${REGISTRY}/${IMAGE_NAME}:${VERSION}"
ECS_IP="47.102.107.172"
PORT="8082"

echo "=========================================="
echo "方案1部署 - 直接端口访问"
echo "=========================================="
echo ""
echo "部署信息:"
echo "  - 镜像: ${FULL_IMAGE_NAME}"
echo "  - ECS IP: ${ECS_IP}"
echo "  - 端口: ${PORT}"
echo "  - 访问地址: http://${ECS_IP}:${PORT}"
echo ""

# 步骤1: 登录阿里云镜像仓库
echo "步骤 1: 登录阿里云镜像仓库"
echo "请手动执行以下命令并输入密码："
echo ""
echo "docker login --username=sunce@sharingtea.com ${REGISTRY}"
echo ""
read -p "是否已完成登录？(y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "请先完成登录后再继续"
    exit 1
fi

# 步骤2: 检查本地镜像
echo ""
echo "步骤 2: 检查本地镜像"
if docker images | grep -q "${IMAGE_NAME}:${VERSION}"; then
    echo "✓ 本地镜像存在: ${IMAGE_NAME}:${VERSION}"
else
    echo "✗ 本地镜像不存在，请先构建镜像"
    echo "执行: docker build -t ${IMAGE_NAME}:${VERSION} ."
    exit 1
fi

# 步骤3: 给镜像打tag
echo ""
echo "步骤 3: 给镜像打tag"
docker tag ${IMAGE_NAME}:${VERSION} ${FULL_IMAGE_NAME}
echo "✓ 镜像tag已创建: ${FULL_IMAGE_NAME}"

# 步骤4: 推送镜像
echo ""
echo "步骤 4: 推送镜像到阿里云"
docker push ${FULL_IMAGE_NAME}
echo "✓ 镜像推送完成"

# 步骤5: 验证推送
echo ""
echo "步骤 5: 验证镜像推送"
if docker pull ${FULL_IMAGE_NAME} > /dev/null 2>&1; then
    echo "✓ 镜像推送验证成功"
else
    echo "✗ 镜像推送验证失败，请检查网络连接"
    exit 1
fi

echo ""
echo "=========================================="
echo "本地推送完成！"
echo "=========================================="
echo ""
echo "接下来请在ECS服务器上执行以下命令："
echo ""
echo "1. 登录ECS:"
echo "   ssh root@${ECS_IP}"
echo ""
echo "2. 登录阿里云镜像仓库:"
echo "   docker login --username=sunce@sharingtea.com ${REGISTRY}"
echo ""
echo "3. 拉取镜像:"
echo "   docker pull ${FULL_IMAGE_NAME}"
echo ""
echo "4. 运行容器:"
echo "   docker run -d \\"
echo "     --name investment \\"
echo "     -p ${PORT}:${PORT} \\"
echo "     --restart=always \\"
echo "     ${FULL_IMAGE_NAME}"
echo ""
echo "5. 验证部署:"
echo "   docker ps | grep investment"
echo "   curl http://localhost:${PORT}"
echo ""
echo "6. 访问应用:"
echo "   http://${ECS_IP}:${PORT}"
echo ""
echo "=========================================="

