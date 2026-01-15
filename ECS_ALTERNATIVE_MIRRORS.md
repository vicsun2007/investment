# ECS构建 - 替代镜像源方案

## 问题
阿里云的 `registry.cn-hangzhou.aliyuncs.com/acs/node:18-alpine` 镜像不存在。

## 解决方案

### 方案1: 使用其他国内镜像源（推荐）

尝试这些可用的镜像源：

```bash
cd /root/investment-build

# 方法A: 使用163镜像
sed -i 's|FROM registry.cn-hangzhou.aliyuncs.com/acs/node:18-alpine AS base|FROM hub.c.163.com/library/node:18-alpine AS base|g' Dockerfile

# 方法B: 使用Azure镜像
sed -i 's|FROM registry.cn-hangzhou.aliyuncs.com/acs/node:18-alpine AS base|FROM dockerhub.azk8s.cn/library/node:18-alpine AS base|g' Dockerfile

# 方法C: 使用腾讯云镜像
sed -i 's|FROM registry.cn-hangzhou.aliyuncs.com/acs/node:18-alpine AS base|FROM ccr.ccs.tencentyun.com/library/node:18-alpine AS base|g' Dockerfile
```

### 方案2: 先手动拉取并tag

```bash
# 尝试从不同源拉取
docker pull hub.c.163.com/library/node:18-alpine
# 或
docker pull dockerhub.azk8s.cn/library/node:18-alpine

# 如果成功，tag为node:18-alpine
docker tag hub.c.163.com/library/node:18-alpine node:18-alpine
# 或
docker tag dockerhub.azk8s.cn/library/node:18-alpine node:18-alpine

# 然后恢复原Dockerfile
sed -i 's|FROM.*node:18-alpine AS base|FROM node:18-alpine AS base|g' Dockerfile

# 构建
docker build -t crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64 .
```

### 方案3: 使用阿里云容器镜像服务的公共镜像仓库

```bash
# 尝试阿里云的其他路径
docker pull registry.cn-hangzhou.aliyuncs.com/google_containers/node:18-alpine
# 或直接使用官方镜像但配置镜像加速器
```

### 方案4: 配置Docker使用镜像加速器后使用官方镜像

```bash
# 1. 配置镜像加速器（使用可用的DNS）
cat > /etc/docker/daemon.json << 'EOF'
{
  "registry-mirrors": [
    "https://dockerhub.azk8s.cn",
    "https://hub-mirror.c.163.com"
  ]
}
EOF

systemctl daemon-reload
systemctl restart docker

# 2. 恢复原Dockerfile
cd /root/investment-build
sed -i 's|FROM.*node:18-alpine AS base|FROM node:18-alpine AS base|g' Dockerfile

# 3. 构建
docker build -t crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64 .
```

## 推荐操作步骤

### 步骤1: 尝试手动拉取基础镜像

```bash
# 尝试多个镜像源
echo "尝试163镜像..."
docker pull hub.c.163.com/library/node:18-alpine && \
docker tag hub.c.163.com/library/node:18-alpine node:18-alpine && \
echo "✓ 163镜像拉取成功" && exit 0

echo "尝试Azure镜像..."
docker pull dockerhub.azk8s.cn/library/node:18-alpine && \
docker tag dockerhub.azk8s.cn/library/node:18-alpine node:18-alpine && \
echo "✓ Azure镜像拉取成功" && exit 0

echo "尝试腾讯云镜像..."
docker pull ccr.ccs.tencentyun.com/library/node:18-alpine && \
docker tag ccr.ccs.tencentyun.com/library/node:18-alpine node:18-alpine && \
echo "✓ 腾讯云镜像拉取成功" && exit 0

echo "✗ 所有镜像源都失败"
```

### 步骤2: 如果拉取成功，恢复Dockerfile并构建

```bash
cd /root/investment-build

# 恢复原Dockerfile
sed -i 's|FROM.*node:18-alpine AS base|FROM node:18-alpine AS base|g' Dockerfile

# 构建
docker build -t crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64 .
```

### 步骤3: 如果手动拉取失败，修改Dockerfile使用可用镜像源

```bash
cd /root/investment-build

# 尝试163镜像
sed -i 's|FROM.*node:18-alpine AS base|FROM hub.c.163.com/library/node:18-alpine AS base|g' Dockerfile
docker build -t crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64 .

# 如果失败，尝试Azure镜像
sed -i 's|FROM.*node:18-alpine AS base|FROM dockerhub.azk8s.cn/library/node:18-alpine AS base|g' Dockerfile
docker build -t crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64 .
```

