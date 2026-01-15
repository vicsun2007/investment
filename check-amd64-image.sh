#!/bin/bash

# 检查本地是否有AMD64镜像的脚本

echo "=========================================="
echo "检查本地AMD64镜像"
echo "=========================================="
echo ""

# 检查所有investment相关镜像
echo "1. 检查所有investment相关镜像："
docker images | grep -E "(investment|vicsun.*oms)" | while read line; do
    img_id=$(echo $line | awk '{print $3}')
    img_name=$(echo $line | awk '{print $1":"$2}')
    
    if [ "$img_id" != "IMAGE" ]; then
        arch=$(docker image inspect $img_id --format '{{.Architecture}}' 2>/dev/null)
        os=$(docker image inspect $img_id --format '{{.Os}}' 2>/dev/null)
        echo "  $img_name"
        echo "    ID: $img_id"
        echo "    平台: $arch/$os"
        echo ""
    fi
done

# 检查是否有AMD64版本
echo "2. 查找AMD64架构的镜像："
found_amd64=false
docker images | grep -E "(investment|vicsun.*oms)" | while read line; do
    img_id=$(echo $line | awk '{print $3}')
    if [ "$img_id" != "IMAGE" ]; then
        arch=$(docker image inspect $img_id --format '{{.Architecture}}' 2>/dev/null)
        if [ "$arch" = "amd64" ] || [ "$arch" = "x86_64" ]; then
            img_name=$(echo $line | awk '{print $1":"$2}')
            echo "  ✓ 找到AMD64镜像: $img_name"
            found_amd64=true
        fi
    fi
done

if [ "$found_amd64" = false ]; then
    echo "  ✗ 未找到AMD64架构的investment镜像"
    echo ""
    echo "建议："
    echo "  1. 在ECS上直接构建AMD64镜像（推荐）"
    echo "  2. 或者使用当前ARM64镜像（如果ECS上能正常运行）"
fi

echo ""
echo "=========================================="

