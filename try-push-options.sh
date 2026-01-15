#!/bin/bash

# 尝试不同的推送路径

REGISTRY="crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun"

echo "尝试不同的镜像路径..."
echo ""

# 方案1: 使用oms仓库，标签为investment-v1
echo "方案1: 推送到 oms:investment-v1"
docker tag investment:v1 ${REGISTRY}/oms:investment-v1
docker push ${REGISTRY}/oms:investment-v1
if [ $? -eq 0 ]; then
    echo "✓ 方案1成功！使用: ${REGISTRY}/oms:investment-v1"
    exit 0
fi

# 方案2: 使用oms仓库，标签为v1
echo ""
echo "方案2: 推送到 oms:v1"
docker tag investment:v1 ${REGISTRY}/oms:v1
docker push ${REGISTRY}/oms:v1
if [ $? -eq 0 ]; then
    echo "✓ 方案2成功！使用: ${REGISTRY}/oms:v1"
    exit 0
fi

# 方案3: 创建新仓库investment
echo ""
echo "方案3: 推送到新仓库 investment:v1"
echo "注意：如果仓库不存在，需要在阿里云控制台先创建"
docker tag investment:v1 ${REGISTRY}/investment:v1
docker push ${REGISTRY}/investment:v1
if [ $? -eq 0 ]; then
    echo "✓ 方案3成功！使用: ${REGISTRY}/investment:v1"
    exit 0
fi

echo ""
echo "所有方案都失败了，请检查："
echo "1. 阿里云控制台中的仓库结构"
echo "2. 用户权限"
echo "3. 仓库是否存在"

