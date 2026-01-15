# ECS网络问题解决方案

## 问题
ECS无法访问外部镜像源（Docker Hub、163、Azure等都超时）

## 解决方案

### 方案1: 从本地构建AMD64镜像并推送（最推荐）⭐

既然ECS网络有问题，可以在本地使用buildx构建AMD64镜像：

#### 1.1 在本地Mac上使用buildx构建AMD64镜像

```bash
cd /Users/ce/Desktop/go/investment

# 创建buildx构建器（如果还没有）
docker buildx create --name multiarch --use 2>/dev/null || docker buildx use multiarch

# 构建AMD64镜像并直接推送
docker buildx build --platform linux/amd64 \
  --push \
  -t crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64 \
  .

# 或者先构建到本地，再推送
docker buildx build --platform linux/amd64 \
  -t crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64 \
  --load \
  .

# 然后推送
docker push crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64
```

#### 1.2 在ECS上直接拉取

```bash
# 登录阿里云镜像仓库
docker login --username=sunce@sharingtea.com crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms

# 拉取镜像
docker pull crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64

# 运行
docker run -d --name investment -p 8082:8082 --restart=always \
  crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64
```

### 方案2: 检查ECS网络配置

```bash
# 检查网络连接
ping 8.8.8.8
ping registry-1.docker.io

# 检查DNS
cat /etc/resolv.conf
nslookup hub.c.163.com

# 检查防火墙
iptables -L -n
systemctl status firewalld

# 检查代理设置
echo $http_proxy
echo $https_proxy
```

### 方案3: 使用ECS上已有的镜像

检查ECS上是否已有node镜像：

```bash
# 查看所有镜像
docker images | grep node

# 如果有node镜像，可以直接使用
docker images | grep -E "node|alpine"
```

### 方案4: 配置代理（如果有）

如果ECS有代理服务器：

```bash
# 配置Docker代理
mkdir -p /etc/systemd/system/docker.service.d
cat > /etc/systemd/system/docker.service.d/http-proxy.conf << EOF
[Service]
Environment="HTTP_PROXY=http://proxy.example.com:8080"
Environment="HTTPS_PROXY=http://proxy.example.com:8080"
Environment="NO_PROXY=localhost,127.0.0.1"
EOF

systemctl daemon-reload
systemctl restart docker
```

### 方案5: 使用阿里云内网镜像服务

如果ECS在阿里云，可以尝试使用阿里云内网地址：

```bash
# 尝试阿里云内网镜像服务
docker pull registry-vpc.cn-hangzhou.aliyuncs.com/acs/node:18-alpine
```

## 推荐操作

**最推荐：方案1 - 在本地构建AMD64镜像**

因为：
1. ✅ 本地网络正常
2. ✅ 可以使用buildx构建AMD64镜像
3. ✅ 直接推送到阿里云，ECS只需拉取
4. ✅ 避免ECS网络问题

