#!/bin/bash

# 在ECS上运行Investment容器的脚本

IMAGE_NAME="crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1"
CONTAINER_NAME="investment"
PORT="8082"

echo "=========================================="
echo "启动Investment容器"
echo "=========================================="
echo ""

# 1. 检查并停止旧容器（如果存在）
echo "1. 检查旧容器..."
if docker ps -a | grep -q ${CONTAINER_NAME}; then
    echo "发现旧容器，正在停止并删除..."
    docker stop ${CONTAINER_NAME} 2>/dev/null || true
    docker rm ${CONTAINER_NAME} 2>/dev/null || true
    echo "✓ 旧容器已清理"
else
    echo "✓ 没有旧容器"
fi

# 2. 检查端口占用
echo ""
echo "2. 检查端口 ${PORT} 占用情况..."
if netstat -tlnp 2>/dev/null | grep -q ":${PORT} "; then
    echo "⚠ 警告: 端口 ${PORT} 已被占用"
    echo "占用端口的进程："
    netstat -tlnp 2>/dev/null | grep ":${PORT} "
    read -p "是否继续？(y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✓ 端口 ${PORT} 可用"
fi

# 3. 运行容器
echo ""
echo "3. 启动容器..."
docker run -d \
  --name ${CONTAINER_NAME} \
  -p ${PORT}:${PORT} \
  --restart=always \
  ${IMAGE_NAME}

if [ $? -eq 0 ]; then
    echo "✓ 容器启动成功"
else
    echo "✗ 容器启动失败"
    exit 1
fi

# 4. 等待容器启动
echo ""
echo "4. 等待容器启动..."
sleep 5

# 5. 检查容器状态
echo ""
echo "5. 检查容器状态..."
docker ps | grep ${CONTAINER_NAME}
if [ $? -eq 0 ]; then
    echo "✓ 容器运行正常"
else
    echo "✗ 容器未运行，查看日志："
    docker logs ${CONTAINER_NAME}
    exit 1
fi

# 6. 查看日志
echo ""
echo "6. 查看容器日志（最近20行）..."
docker logs --tail 20 ${CONTAINER_NAME}

# 7. 测试访问
echo ""
echo "7. 测试服务访问..."
sleep 3
if curl -s http://localhost:${PORT} > /dev/null; then
    echo "✓ 服务访问正常"
else
    echo "⚠ 服务可能还在启动中，请稍后访问"
fi

# 8. 显示访问信息
echo ""
echo "=========================================="
echo "部署完成！"
echo "=========================================="
echo ""
echo "容器信息:"
docker ps | grep ${CONTAINER_NAME}
echo ""
echo "访问地址:"
echo "  - 内网: http://localhost:${PORT}"
echo "  - 公网: http://47.102.107.172:${PORT}"
echo ""
echo "常用命令:"
echo "  - 查看日志: docker logs -f ${CONTAINER_NAME}"
echo "  - 重启容器: docker restart ${CONTAINER_NAME}"
echo "  - 停止容器: docker stop ${CONTAINER_NAME}"
echo "  - 查看状态: docker ps | grep ${CONTAINER_NAME}"
echo ""
echo "=========================================="

