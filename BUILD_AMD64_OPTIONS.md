# 构建AMD64镜像的解决方案

## 问题

构建时无法拉取 `node:18-alpine` 基础镜像，可能是：
1. Docker Hub拉取限制
2. 需要登录Docker Hub
3. 网络问题

## 解决方案

### 方案1: 登录Docker Hub（如果有限制）

```bash
docker login
# 输入Docker Hub用户名和密码
```

然后重新构建：
```bash
docker build --platform linux/amd64 -f Dockerfile.amd64 -t investment:v1-amd64 .
```

### 方案2: 在ECS上直接构建（最推荐）⭐

因为ECS本身就是AMD64平台，直接在ECS上构建最简单：

#### 2.1 上传代码到ECS

```bash
# 在本地打包代码（排除node_modules等）
tar --exclude='node_modules' \
    --exclude='.next' \
    --exclude='.git' \
    -czf investment-code.tar.gz .

# 上传到ECS
scp investment-code.tar.gz root@47.102.107.172:/root/
```

#### 2.2 在ECS上构建

```bash
# 登录ECS
ssh root@47.102.107.172

# 解压代码
cd /root
tar -xzf investment-code.tar.gz -C investment-build
cd investment-build

# 构建镜像（ECS本身就是AMD64，不需要--platform参数）
docker build -t crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64 .

# 推送镜像
docker login --username=sunce@sharingtea.com crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms
docker push crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64
```

### 方案3: 使用国内镜像源

如果Docker Hub访问有问题，可以配置国内镜像源：

#### 3.1 配置Docker镜像加速器

编辑 `/etc/docker/daemon.json`（Linux）或 Docker Desktop设置（Mac）：

```json
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
```

然后重启Docker：
```bash
# Mac: 重启Docker Desktop
# Linux:
sudo systemctl restart docker
```

#### 3.2 重新构建

```bash
docker build --platform linux/amd64 -f Dockerfile.amd64 -t investment:v1-amd64 .
```

### 方案4: 检查当前容器是否可用

如果当前ARM64镜像在ECS上能正常运行，可以暂时不重新构建：

```bash
# 在ECS上检查
docker ps | grep investment
docker logs investment
curl http://localhost:8082
```

如果一切正常，可以继续使用，只是性能可能稍差。

## 推荐方案

**最推荐：方案2（在ECS上直接构建）**
- ✅ 不需要处理平台问题
- ✅ 不需要处理Docker Hub限制
- ✅ 构建速度更快
- ✅ 直接就是AMD64平台

## 快速操作

### 在ECS上构建（推荐）

```bash
# 1. 在本地打包代码
cd /Users/ce/Desktop/go/investment
tar --exclude='node_modules' \
    --exclude='.next' \
    --exclude='.git' \
    --exclude='*.log' \
    -czf /tmp/investment-code.tar.gz .

# 2. 上传到ECS
scp /tmp/investment-code.tar.gz root@47.102.107.172:/root/

# 3. 在ECS上执行
ssh root@47.102.107.172
cd /root
mkdir -p investment-build
tar -xzf investment-code.tar.gz -C investment-build
cd investment-build
docker build -t crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64 .
docker login --username=sunce@sharingtea.com crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms
docker push crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64
```

