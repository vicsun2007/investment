#!/bin/bash

# 检查容器运行状态的脚本

CONTAINER_NAME="investment"

echo "=========================================="
echo "检查Investment容器状态"
echo "=========================================="
echo ""

# 1. 检查容器是否存在
echo "1. 检查容器..."
if docker ps -a | grep -q ${CONTAINER_NAME}; then
    echo "✓ 容器存在"
else
    echo "✗ 容器不存在"
    exit 1
fi

# 2. 检查容器运行状态
echo ""
echo "2. 检查容器运行状态..."
docker ps | grep ${CONTAINER_NAME}
if [ $? -eq 0 ]; then
    echo "✓ 容器正在运行"
else
    echo "✗ 容器未运行，查看状态："
    docker ps -a | grep ${CONTAINER_NAME}
    echo ""
    echo "查看日志："
    docker logs ${CONTAINER_NAME}
    exit 1
fi

# 3. 检查端口监听
echo ""
echo "3. 检查端口8082监听..."
if netstat -tlnp 2>/dev/null | grep -q ":8082 "; then
    echo "✓ 端口8082正在监听"
    netstat -tlnp 2>/dev/null | grep ":8082 "
else
    echo "⚠ 端口8082未监听（可能还在启动中）"
fi

# 4. 查看容器日志（最近20行）
echo ""
echo "4. 查看容器日志（最近20行）..."
docker logs --tail 20 ${CONTAINER_NAME}

# 5. 测试访问
echo ""
echo "5. 测试服务访问..."
sleep 2
if curl -s -o /dev/null -w "%{http_code}" http://localhost:8082 | grep -q "200"; then
    echo "✓ 服务访问正常 (HTTP 200)"
    echo ""
    echo "可以访问: http://47.102.107.172:8082"
else
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8082)
    echo "⚠ HTTP状态码: ${HTTP_CODE}"
    echo "服务可能还在启动中，请稍后重试"
fi

echo ""
echo "=========================================="

