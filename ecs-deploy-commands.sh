#!/bin/bash

# ECS服务器上执行的部署命令
# 在ECS服务器上运行此脚本，或逐条执行以下命令

REGISTRY="crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms"
IMAGE_TAG="investment-v1"
FULL_IMAGE_NAME="${REGISTRY}:${IMAGE_TAG}"
CONTAINER_NAME="investment"
PORT="8082"

echo "=========================================="
echo "在ECS上部署Investment服务"
echo "=========================================="
echo ""

# 1. 检查Docker是否安装
echo "1. 检查Docker..."
if ! command -v docker &> /dev/null; then
    echo "Docker未安装，正在安装..."
    # CentOS/RHEL
    if [ -f /etc/redhat-release ]; then
        yum install -y docker
        systemctl start docker
        systemctl enable docker
    # Ubuntu/Debian
    elif [ -f /etc/debian_version ]; then
        apt-get update
        apt-get install -y docker.io
        systemctl start docker
        systemctl enable docker
    fi
fi
echo "✓ Docker已就绪"

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

# 3. 停止并删除旧容器（如果存在）
echo ""
echo "3. 检查并清理旧容器..."
if docker ps -a | grep -q ${CONTAINER_NAME}; then
    echo "发现旧容器，正在停止并删除..."
    docker stop ${CONTAINER_NAME} 2>/dev/null || true
    docker rm ${CONTAINER_NAME} 2>/dev/null || true
    echo "✓ 旧容器已清理"
else
    echo "✓ 没有旧容器"
fi

# 4. 拉取最新镜像
echo ""
echo "4. 拉取最新镜像..."
docker pull ${FULL_IMAGE_NAME}
if [ $? -eq 0 ]; then
    echo "✓ 镜像拉取成功"
else
    echo "✗ 镜像拉取失败"
    exit 1
fi

# 5. 运行容器
echo ""
echo "5. 启动容器..."
docker run -d \
  --name ${CONTAINER_NAME} \
  -p ${PORT}:${PORT} \
  --restart=always \
  ${FULL_IMAGE_NAME}

if [ $? -eq 0 ]; then
    echo "✓ 容器启动成功"
else
    echo "✗ 容器启动失败"
    exit 1
fi

# 6. 等待容器启动
echo ""
echo "6. 等待容器启动..."
sleep 5

# 7. 检查容器状态
echo ""
echo "7. 检查容器状态..."
docker ps | grep ${CONTAINER_NAME}
if [ $? -eq 0 ]; then
    echo "✓ 容器运行正常"
else
    echo "✗ 容器未运行，查看日志："
    docker logs ${CONTAINER_NAME}
    exit 1
fi

# 8. 测试访问
echo ""
echo "8. 测试服务访问..."
sleep 2
if curl -s http://localhost:${PORT} > /dev/null; then
    echo "✓ 服务访问正常"
else
    echo "⚠ 服务可能还在启动中，请稍后访问"
fi

# 9. 显示访问信息
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

