#!/bin/bash

# 构建AMD64镜像的脚本

set -e

echo "=========================================="
echo "构建AMD64平台镜像"
echo "=========================================="
echo ""

# 方案1: 尝试登录Docker Hub
echo "方案1: 尝试登录Docker Hub（如果需要）"
echo "如果Docker Hub有拉取限制，可能需要登录"
echo "执行: docker login"
echo ""

# 方案2: 使用国内镜像源（推荐）
echo "方案2: 使用国内镜像源构建"
echo "正在构建AMD64镜像..."

# 使用--platform参数明确指定平台
docker build --platform linux/amd64 \
  -f Dockerfile.amd64 \
  -t investment:v1-amd64 .

if [ $? -eq 0 ]; then
    echo "✓ 镜像构建成功"
    
    # 打tag
    echo ""
    echo "给镜像打tag..."
    docker tag investment:v1-amd64 crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64
    
    echo "✓ Tag创建成功"
    echo ""
    echo "镜像信息:"
    docker images | grep investment
    echo ""
    echo "下一步：推送镜像"
    echo "docker push crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64"
else
    echo "✗ 镜像构建失败"
    echo ""
    echo "如果遇到Docker Hub拉取问题，可以："
    echo "1. 登录Docker Hub: docker login"
    echo "2. 或者在ECS上直接构建（推荐）"
    exit 1
fi

