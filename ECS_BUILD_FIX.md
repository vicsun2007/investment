# ECS构建镜像网络问题解决方案

## 问题

在ECS上构建时无法从Docker Hub拉取基础镜像，出现超时错误。

## 解决方案：配置Docker镜像加速器

### 方法1: 使用脚本配置（推荐）

在ECS上执行：

```bash
# 创建配置脚本
cat > /tmp/configure-docker-mirror.sh << 'EOF'
#!/bin/bash
DOCKER_CONFIG="/etc/docker/daemon.json"
mkdir -p /etc/docker

# 备份现有配置
if [ -f "$DOCKER_CONFIG" ]; then
    cp $DOCKER_CONFIG ${DOCKER_CONFIG}.backup.$(date +%Y%m%d_%H%M%S)
fi

# 创建新配置
cat > $DOCKER_CONFIG << 'INNER_EOF'
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com",
    "https://dockerhub.azk8s.cn",
    "https://reg-mirror.qiniu.com"
  ]
}
INNER_EOF

# 重启Docker
systemctl daemon-reload
systemctl restart docker

echo "配置完成！"
docker info | grep -A 10 "Registry Mirrors"
EOF

chmod +x /tmp/configure-docker-mirror.sh
/tmp/configure-docker-mirror.sh
```

### 方法2: 手动配置

```bash
# 1. 创建或编辑配置文件
vim /etc/docker/daemon.json

# 2. 添加以下内容
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com",
    "https://dockerhub.azk8s.cn",
    "https://reg-mirror.qiniu.com"
  ]
}

# 3. 保存后重启Docker
systemctl daemon-reload
systemctl restart docker

# 4. 验证配置
docker info | grep -A 10 "Registry Mirrors"
```

### 方法3: 使用阿里云容器镜像服务（推荐）

阿里云提供了官方的镜像加速器：

```bash
# 1. 编辑配置文件
vim /etc/docker/daemon.json

# 2. 添加阿里云镜像加速器（需要替换为您的专属地址）
# 登录阿里云控制台 -> 容器镜像服务 -> 镜像加速器，获取专属地址
{
  "registry-mirrors": [
    "https://您的专属地址.mirror.aliyuncs.com"
  ]
}

# 3. 重启Docker
systemctl daemon-reload
systemctl restart docker
```

## 配置完成后重新构建

```bash
cd /root/investment-build
docker build -t crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64 .
```

## 如果仍然超时

### 方案A: 先手动拉取基础镜像

```bash
# 使用镜像加速器拉取基础镜像
docker pull node:18-alpine

# 然后再构建
docker build -t crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64 .
```

### 方案B: 使用阿里云容器镜像服务的公共镜像

修改Dockerfile，使用阿里云镜像：

```dockerfile
# 使用阿里云镜像（如果可用）
FROM registry.cn-hangzhou.aliyuncs.com/acs/node:18-alpine AS base
```

或者使用其他可用的镜像源。

### 方案C: 检查网络连接

```bash
# 测试网络连接
ping registry-1.docker.io
ping docker.mirrors.ustc.edu.cn

# 检查DNS
nslookup registry-1.docker.io
```

## 快速操作步骤

1. **配置镜像加速器**（选择上述任一方法）
2. **重启Docker**: `systemctl restart docker`
3. **验证配置**: `docker info | grep "Registry Mirrors"`
4. **重新构建**: `docker build -t ...`

## 推荐配置

使用中科大镜像源（速度快且稳定）：

```json
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn"
  ]
}
```

