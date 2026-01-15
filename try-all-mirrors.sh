#!/bin/bash

# 尝试所有可用的镜像源

echo "=========================================="
echo "尝试拉取Node.js基础镜像"
echo "=========================================="
echo ""

cd /root/investment-build || exit 1

# 尝试镜像源列表
MIRRORS=(
    "hub.c.163.com/library/node:18-alpine"
    "dockerhub.azk8s.cn/library/node:18-alpine"
    "ccr.ccs.tencentyun.com/library/node:18-alpine"
    "node:18-alpine"
)

SUCCESS=false

for mirror in "${MIRRORS[@]}"; do
    echo "尝试: $mirror"
    if docker pull "$mirror" 2>/dev/null; then
        echo "✓ 拉取成功: $mirror"
        
        # Tag为node:18-alpine
        docker tag "$mirror" node:18-alpine
        echo "✓ 已tag为node:18-alpine"
        
        SUCCESS=true
        break
    else
        echo "✗ 拉取失败: $mirror"
    fi
    echo ""
done

if [ "$SUCCESS" = true ]; then
    echo ""
    echo "=========================================="
    echo "基础镜像准备完成"
    echo "=========================================="
    echo ""
    echo "恢复Dockerfile并使用本地镜像构建..."
    
    # 恢复原Dockerfile
    sed -i 's|FROM.*node:18-alpine AS base|FROM node:18-alpine AS base|g' Dockerfile
    
    echo ""
    echo "开始构建..."
    docker build -t crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64 .
else
    echo ""
    echo "=========================================="
    echo "所有镜像源都失败"
    echo "=========================================="
    echo ""
    echo "请检查："
    echo "1. 网络连接"
    echo "2. DNS配置"
    echo "3. 防火墙设置"
fi

