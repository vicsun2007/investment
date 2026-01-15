# ECS构建问题 - DNS和镜像源解决方案

## 问题分析

1. DNS无法解析镜像加速器地址
2. 无法访问Docker Hub

## 解决方案

### 方案1: 使用阿里云容器镜像服务的公共镜像（推荐）⭐

修改Dockerfile，直接使用阿里云的镜像源：

```bash
cd /root/investment-build

# 备份原Dockerfile
cp Dockerfile Dockerfile.backup

# 修改Dockerfile，使用阿里云镜像
sed -i 's|FROM node:18-alpine|FROM registry.cn-hangzhou.aliyuncs.com/acs/node:18-alpine|g' Dockerfile

# 或者手动编辑
vim Dockerfile
# 将第一行改为：
# FROM registry.cn-hangzhou.aliyuncs.com/acs/node:18-alpine AS base
```

### 方案2: 配置正确的DNS和镜像加速器

```bash
# 1. 检查DNS配置
cat /etc/resolv.conf

# 2. 如果DNS有问题，添加公共DNS
echo "nameserver 223.5.5.5" >> /etc/resolv.conf
echo "nameserver 114.114.114.114" >> /etc/resolv.conf

# 3. 使用阿里云专属镜像加速器（如果有）
# 登录阿里云控制台 -> 容器镜像服务 -> 镜像加速器
# 获取您的专属加速地址

# 4. 配置Docker镜像加速器
cat > /etc/docker/daemon.json << 'EOF'
{
  "registry-mirrors": [
    "https://registry.cn-hangzhou.aliyuncs.com"
  ]
}
EOF

systemctl daemon-reload
systemctl restart docker
```

### 方案3: 直接使用阿里云公共镜像仓库的node镜像

修改Dockerfile使用阿里云镜像：

```dockerfile
# 使用阿里云镜像
FROM registry.cn-hangzhou.aliyuncs.com/acs/node:18-alpine AS base
```

### 方案4: 手动拉取并tag基础镜像

```bash
# 尝试从不同源拉取
docker pull registry.cn-hangzhou.aliyuncs.com/acs/node:18-alpine

# 如果成功，tag为node:18-alpine
docker tag registry.cn-hangzhou.aliyuncs.com/acs/node:18-alpine node:18-alpine

# 然后再构建
docker build -t crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64 .
```

## 推荐操作步骤

### 步骤1: 修改Dockerfile使用阿里云镜像

```bash
cd /root/investment-build

# 编辑Dockerfile
vim Dockerfile
```

将第2行：
```dockerfile
FROM node:18-alpine AS base
```

改为：
```dockerfile
FROM registry.cn-hangzhou.aliyuncs.com/acs/node:18-alpine AS base
```

### 步骤2: 重新构建

```bash
docker build -t crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64 .
```

## 如果阿里云镜像也不可用

### 使用其他国内镜像源

```bash
# 尝试这些镜像源
docker pull dockerhub.azk8s.cn/library/node:18-alpine
# 或
docker pull hub.c.163.com/library/node:18-alpine

# 如果成功，tag为node:18-alpine
docker tag dockerhub.azk8s.cn/library/node:18-alpine node:18-alpine
```

## 快速修复命令

```bash
cd /root/investment-build

# 方法1: 直接修改Dockerfile使用阿里云镜像
sed -i 's|FROM node:18-alpine AS base|FROM registry.cn-hangzhou.aliyuncs.com/acs/node:18-alpine AS base|g' Dockerfile

# 验证修改
head -3 Dockerfile

# 重新构建
docker build -t crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64 .
```

