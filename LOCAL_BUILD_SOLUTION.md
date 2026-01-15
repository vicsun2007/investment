# 本地构建AMD64镜像解决方案

## 问题
本地Mac也无法访问Docker Hub，构建失败。

## 解决方案

### 方案1: 使用国内镜像源修改Dockerfile（推荐）

```bash
cd /Users/ce/Desktop/go/investment

# 备份原Dockerfile
cp Dockerfile Dockerfile.backup

# 修改Dockerfile使用163镜像源
sed -i '' 's|FROM node:18-alpine AS base|FROM hub.c.163.com/library/node:18-alpine AS base|g' Dockerfile

# 验证修改
head -3 Dockerfile

# 构建并推送
docker buildx build --platform linux/amd64 \
  --push \
  -t crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64 \
  .

# 恢复原Dockerfile
mv Dockerfile.backup Dockerfile
```

### 方案2: 先手动拉取基础镜像

```bash
cd /Users/ce/Desktop/go/investment

# 尝试拉取163镜像
docker pull hub.c.163.com/library/node:18-alpine

# 如果成功，tag为node:18-alpine
docker tag hub.c.163.com/library/node:18-alpine node:18-alpine

# 使用原Dockerfile构建（会使用本地镜像）
docker buildx build --platform linux/amd64 \
  --push \
  -t crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64 \
  .
```

### 方案3: 配置Docker Desktop镜像加速器

1. 打开Docker Desktop
2. 进入 Settings -> Docker Engine
3. 添加镜像加速器配置：

```json
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
```

4. 点击 Apply & Restart
5. 重新构建

### 方案4: 使用脚本自动处理

```bash
cd /Users/ce/Desktop/go/investment
./build-amd64-local.sh
```

## 推荐操作步骤

### 步骤1: 修改Dockerfile使用163镜像源

```bash
cd /Users/ce/Desktop/go/investment

# Mac上sed命令需要加空字符串参数
sed -i '' 's|FROM node:18-alpine AS base|FROM hub.c.163.com/library/node:18-alpine AS base|g' Dockerfile

# 验证
head -3 Dockerfile
```

### 步骤2: 登录并构建

```bash
# 登录阿里云
docker login --username=sunce@sharingtea.com crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms

# 创建buildx构建器
docker buildx create --name multiarch --use 2>/dev/null || docker buildx use multiarch

# 构建并推送
docker buildx build --platform linux/amd64 \
  --push \
  -t crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64 \
  .
```

### 步骤3: 恢复Dockerfile

```bash
# 如果备份了，恢复原Dockerfile
# 或者手动改回来
sed -i '' 's|FROM hub.c.163.com/library/node:18-alpine AS base|FROM node:18-alpine AS base|g' Dockerfile
```

## 如果163镜像也失败

尝试其他镜像源：

```bash
# Azure镜像
sed -i '' 's|FROM.*node:18-alpine AS base|FROM dockerhub.azk8s.cn/library/node:18-alpine AS base|g' Dockerfile

# 腾讯云镜像
sed -i '' 's|FROM.*node:18-alpine AS base|FROM ccr.ccs.tencentyun.com/library/node:18-alpine AS base|g' Dockerfile
```

