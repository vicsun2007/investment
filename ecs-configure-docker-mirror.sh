#!/bin/bash

# 在ECS上配置Docker镜像加速器

echo "=========================================="
echo "配置Docker镜像加速器"
echo "=========================================="
echo ""

# 检查Docker配置目录
DOCKER_CONFIG="/etc/docker/daemon.json"

# 备份现有配置
if [ -f "$DOCKER_CONFIG" ]; then
    echo "1. 备份现有配置..."
    cp $DOCKER_CONFIG ${DOCKER_CONFIG}.backup.$(date +%Y%m%d_%H%M%S)
    echo "✓ 配置已备份"
else
    echo "1. 创建新配置文件..."
    mkdir -p /etc/docker
fi

# 创建或更新配置
echo ""
echo "2. 配置镜像加速器..."
cat > $DOCKER_CONFIG << 'EOF'
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com",
    "https://dockerhub.azk8s.cn",
    "https://reg-mirror.qiniu.com"
  ]
}
EOF

echo "✓ 镜像加速器配置完成"

# 重启Docker服务
echo ""
echo "3. 重启Docker服务..."
systemctl daemon-reload
systemctl restart docker

if [ $? -eq 0 ]; then
    echo "✓ Docker服务重启成功"
else
    echo "✗ Docker服务重启失败，请手动执行: systemctl restart docker"
    exit 1
fi

# 验证配置
echo ""
echo "4. 验证配置..."
docker info | grep -A 10 "Registry Mirrors"

echo ""
echo "=========================================="
echo "配置完成！"
echo "=========================================="
echo ""
echo "现在可以重新尝试构建镜像："
echo "docker build -t crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64 ."
echo ""

