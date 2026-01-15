# 最终解决方案 - 网络问题

## 当前情况
- ECS无法访问外部镜像源
- 本地Mac也无法访问Docker Hub和国内镜像源

## 解决方案

### 方案1: 使用代理（如果有）

如果您的网络环境有代理，可以配置：

#### Mac Docker Desktop配置代理
1. 打开Docker Desktop
2. Settings -> Resources -> Proxies
3. 配置HTTP/HTTPS代理

#### 或者在终端设置代理
```bash
export http_proxy=http://proxy.example.com:8080
export https_proxy=http://proxy.example.com:8080
docker buildx build ...
```

### 方案2: 使用VPN或更换网络

如果可能，连接到可以访问Docker Hub的网络环境。

### 方案3: 使用已构建的ARM64镜像（临时方案）

既然网络有问题，可以暂时使用已推送的ARM64镜像：

```bash
# 在ECS上
docker stop investment
docker rm investment

# 使用ARM64镜像（虽然平台不匹配，但可能能运行）
docker run -d \
  --name investment \
  -p 8082:8082 \
  --restart=always \
  crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1

# 检查是否正常运行
docker logs investment
curl http://localhost:8082
```

如果ARM64镜像在ECS上能正常运行，可以暂时使用，后续网络恢复后再构建AMD64版本。

### 方案4: 在其他有网络的机器上构建

如果有其他可以访问Docker Hub的机器（如其他服务器、CI/CD环境等），可以在那里构建并推送。

## 推荐操作

**立即方案**：先测试ARM64镜像是否可用

```bash
# 在ECS上检查当前容器
docker ps | grep investment
docker logs investment
curl http://localhost:8082
```

如果ARM64镜像能正常运行，可以暂时使用，等网络问题解决后再优化。

## 网络问题解决后

等网络恢复后，可以：

1. 恢复Dockerfile：
```bash
sed -i '' 's|FROM hub.c.163.com/library/node:18-alpine AS base|FROM node:18-alpine AS base|g' Dockerfile
```

2. 重新构建AMD64镜像并推送

