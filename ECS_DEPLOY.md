# ECS部署指南

## 部署信息

- **域名**: https://www.bizops.top/
- **ECS公网IP**: 47.102.107.172
- **前端端口**: 8082
- **镜像地址**: `crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v1`

## 部署步骤

### 1. 本地推送镜像到阿里云

#### 1.1 登录阿里云镜像仓库

```bash
docker login --username=sunce@sharingtea.com crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms
# 输入密码（会提示输入）
```

#### 1.2 给镜像打tag

```bash
docker tag investment:v1 crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v1
```

#### 1.3 推送镜像

```bash
docker push crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v1
```

#### 1.4 验证推送

```bash
docker pull crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v1
```

### 2. 在ECS上部署

#### 2.1 登录ECS服务器

```bash
ssh root@47.102.107.172
```

#### 2.2 安装Docker（如果未安装）

```bash
# CentOS/RHEL
yum install -y docker
systemctl start docker
systemctl enable docker

# Ubuntu/Debian
apt-get update
apt-get install -y docker.io
systemctl start docker
systemctl enable docker
```

#### 2.3 登录阿里云镜像仓库

```bash
docker login --username=sunce@sharingtea.com crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms
```

#### 2.4 拉取镜像

```bash
docker pull crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v1
```

#### 2.5 运行容器

**方式一：直接运行**

```bash
docker run -d \
  --name investment \
  -p 8082:8082 \
  --restart=always \
  crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v1
```

**方式二：使用docker-compose（推荐）**

```bash
# 上传 docker-compose.yml 到ECS
# 然后执行
docker-compose up -d
```

#### 2.6 验证部署

```bash
# 检查容器状态
docker ps | grep investment

# 检查日志
docker logs investment

# 测试访问
curl http://localhost:8082
```

### 3. 配置Nginx反向代理（可选）

**⚠️ 重要提示**: 如果 www.bizops.top 的80端口已有服务在运行，请选择以下方案之一：

#### 方案A: 使用子域名（推荐，不影响现有服务）

1. **配置DNS**: 在域名解析中添加A记录
   - 主机记录: `investment`
   - 记录值: `47.102.107.172`
   - TTL: 600

2. **使用子域名Nginx配置**: 使用 `nginx-subdomain.conf` 文件
   - 这是独立的server块，完全不影响现有服务

3. **配置SSL证书**:
   ```bash
   certbot --nginx -d investment.bizops.top
   ```

#### 方案B: 使用路径前缀（不影响现有服务）

1. **修改Next.js配置**: 使用 `next.config.path-prefix.js` 替换 `next.config.js`
2. **重新构建镜像**: `docker build -t investment:v1 .`
3. **在现有Nginx配置中添加**: 使用 `nginx-path-prefix.conf` 中的location规则
   - 访问地址: `https://www.bizops.top/investment/`

#### 方案C: 直接使用端口（最简单，不影响现有服务）

- 访问地址: `http://47.102.107.172:8082` 或 `https://www.bizops.top:8082`
- 不需要Nginx配置
- 只需确保安全组开放8082端口

**详细方案对比请查看 `DEPLOYMENT_OPTIONS.md` 文件**

如果需要通过域名访问，需要配置Nginx反向代理。

#### 3.1 安装Nginx

```bash
# CentOS/RHEL
yum install -y nginx

# Ubuntu/Debian
apt-get install -y nginx
```

#### 3.2 配置Nginx

将 `nginx.conf` 文件内容复制到 `/etc/nginx/conf.d/investment.conf`

```bash
# 编辑配置文件
vim /etc/nginx/conf.d/investment.conf
# 粘贴nginx.conf的内容
```

**注意**: 需要配置SSL证书路径，如果使用Let's Encrypt：

```bash
certbot --nginx -d www.bizops.top -d bizops.top
```

#### 3.3 启动Nginx

```bash
# 测试配置
nginx -t

# 启动/重启Nginx
systemctl start nginx
systemctl enable nginx
# 或
systemctl restart nginx
```

### 4. 防火墙配置

确保ECS安全组和防火墙开放相应端口：

```bash
# 开放8082端口（如果使用防火墙）
firewall-cmd --permanent --add-port=8082/tcp
firewall-cmd --reload

# 或使用iptables
iptables -A INPUT -p tcp --dport 8082 -j ACCEPT
```

**阿里云安全组配置**:
- 在阿里云控制台配置安全组规则，开放8082端口（TCP）
- 如果使用Nginx，开放80和443端口

### 5. 常用管理命令

```bash
# 查看容器状态
docker ps -a | grep investment

# 查看容器日志
docker logs -f investment

# 重启容器
docker restart investment

# 停止容器
docker stop investment

# 启动容器
docker start investment

# 删除容器
docker rm -f investment

# 更新镜像（拉取新版本后）
docker pull crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v1
docker stop investment
docker rm investment
docker run -d --name investment -p 8082:8082 --restart=always crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v1
```

## 访问地址

- **直接访问**: http://47.102.107.172:8082
- **域名访问**: https://www.bizops.top/ (需要配置Nginx)

## 故障排查

### 容器无法启动

```bash
# 查看详细日志
docker logs investment

# 检查端口占用
netstat -tlnp | grep 8082
```

### 无法访问

1. 检查容器是否运行: `docker ps | grep investment`
2. 检查端口是否开放: `curl http://localhost:8082`
3. 检查防火墙规则
4. 检查阿里云安全组配置

### 镜像拉取失败

```bash
# 重新登录
docker login --username=sunce@sharingtea.com crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms

# 检查网络连接
ping crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com
```

## 更新部署

当有新版本时：

```bash
# 1. 本地构建新版本
docker build -t investment:v2 .

# 2. 打tag并推送
docker tag investment:v2 crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v2
docker push crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v2

# 3. 在ECS上拉取并更新
docker pull crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v2
docker stop investment
docker rm investment
docker run -d --name investment -p 8082:8082 --restart=always crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v2
```

