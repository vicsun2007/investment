#!/bin/bash

# ECS快速修复脚本

echo "=========================================="
echo "修复ECS构建问题"
echo "=========================================="
echo ""

cd /root/investment-build || exit 1

# 方法1: 尝试使用阿里云镜像
echo "方法1: 修改Dockerfile使用阿里云镜像..."
if [ -f "Dockerfile" ]; then
    # 备份
    cp Dockerfile Dockerfile.backup
    
    # 修改
    sed -i 's|FROM node:18-alpine AS base|FROM registry.cn-hangzhou.aliyuncs.com/acs/node:18-alpine AS base|g' Dockerfile
    
    echo "✓ Dockerfile已修改"
    echo ""
    echo "修改后的第一行："
    head -2 Dockerfile
else
    echo "✗ 未找到Dockerfile"
    exit 1
fi

# 方法2: 先尝试拉取基础镜像
echo ""
echo "方法2: 尝试拉取基础镜像..."
docker pull registry.cn-hangzhou.aliyuncs.com/acs/node:18-alpine

if [ $? -eq 0 ]; then
    echo "✓ 基础镜像拉取成功"
    # Tag为node:18-alpine以便Dockerfile使用
    docker tag registry.cn-hangzhou.aliyuncs.com/acs/node:18-alpine node:18-alpine
    echo "✓ 已tag为node:18-alpine"
else
    echo "⚠ 基础镜像拉取失败，将使用Dockerfile中的镜像源"
fi

# 方法3: 重新构建
echo ""
echo "方法3: 开始构建镜像..."
docker build -t crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64 .

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo "✓ 构建成功！"
    echo "=========================================="
    echo ""
    echo "下一步：推送镜像"
    echo "docker login --username=sunce@sharingtea.com crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms"
    echo "docker push crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64"
else
    echo ""
    echo "=========================================="
    echo "✗ 构建失败"
    echo "=========================================="
    echo ""
    echo "请尝试："
    echo "1. 检查网络连接"
    echo "2. 尝试其他镜像源"
    echo "3. 查看详细错误信息"
fi

