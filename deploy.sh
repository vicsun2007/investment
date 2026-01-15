#!/bin/bash

# 部署脚本 - 将前端镜像推送到阿里云并部署到ECS

set -e

# 配置信息
REGISTRY="crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms"
IMAGE_NAME="investment"
VERSION="v1"
FULL_IMAGE_NAME="${REGISTRY}/${IMAGE_NAME}:${VERSION}"

echo "=========================================="
echo "开始部署前端服务到阿里云"
echo "=========================================="

# 1. 登录阿里云镜像仓库
echo ""
echo "步骤 1: 登录阿里云镜像仓库"
echo "请手动执行以下命令并输入密码："
echo "docker login --username=sunce@sharingtea.com ${REGISTRY}"
echo ""
read -p "是否已完成登录？(y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "请先完成登录后再继续"
    exit 1
fi

# 2. 给镜像打tag
echo ""
echo "步骤 2: 给镜像打tag"
docker tag ${IMAGE_NAME}:${VERSION} ${FULL_IMAGE_NAME}
echo "✓ 镜像tag已创建: ${FULL_IMAGE_NAME}"

# 3. 推送镜像
echo ""
echo "步骤 3: 推送镜像到阿里云"
docker push ${FULL_IMAGE_NAME}
echo "✓ 镜像推送完成"

# 4. 验证推送
echo ""
echo "步骤 4: 验证镜像是否推送成功"
docker pull ${FULL_IMAGE_NAME} > /dev/null 2>&1 && echo "✓ 镜像推送验证成功" || echo "✗ 镜像推送验证失败"

echo ""
echo "=========================================="
echo "部署完成！"
echo "=========================================="
echo ""
echo "镜像地址: ${FULL_IMAGE_NAME}"
echo ""
echo "在ECS上部署，请执行以下命令："
echo "1. 登录ECS: ssh root@47.102.107.172"
echo "2. 拉取镜像: docker pull ${FULL_IMAGE_NAME}"
echo "3. 运行容器: docker run -d -p 8082:8082 --name investment --restart=always ${FULL_IMAGE_NAME}"
echo ""
echo "或者使用提供的 docker-compose.yml 文件部署"
echo ""

