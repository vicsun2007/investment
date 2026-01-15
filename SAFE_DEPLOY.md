# 安全部署指南 - 不影响现有服务

## ⚠️ 重要说明

**您的域名 www.bizops.top 的80端口已有服务在运行，部署investment服务时不会影响现有服务！**

## 推荐部署方案

### 🥇 方案1: 直接使用端口访问（最简单、最安全）

**优点**:
- ✅ 完全不影响现有服务
- ✅ 不需要修改任何Nginx配置
- ✅ 部署最快
- ✅ 零风险

**访问地址**:
- `http://47.102.107.172:8082`
- `https://www.bizops.top:8082`（如果配置了SSL）

**部署步骤**:
```bash
# 1. 在ECS上拉取并运行容器
docker pull crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v1
docker run -d --name investment -p 8082:8082 --restart=always \
  crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v1

# 2. 确保阿里云安全组开放8082端口（TCP）
# 在阿里云控制台 -> ECS -> 安全组 -> 添加规则
```

**验证**:
```bash
curl http://47.102.107.172:8082
```

---

### 🥈 方案2: 使用子域名（专业、独立）

**访问地址**: `https://investment.bizops.top/`

**优点**:
- ✅ 完全独立，不影响现有服务
- ✅ URL简洁美观
- ✅ 便于管理

**部署步骤**:

1. **配置DNS**（在域名管理后台）:
   ```
   类型: A
   主机记录: investment
   记录值: 47.102.107.172
   TTL: 600
   ```

2. **在ECS上配置Nginx**:
   ```bash
   # 复制配置文件
   cp nginx-subdomain.conf /etc/nginx/conf.d/investment.conf
   
   # 配置SSL证书
   certbot --nginx -d investment.bizops.top
   
   # 测试配置
   nginx -t
   
   # 重启Nginx
   systemctl restart nginx
   ```

3. **运行Docker容器**:
   ```bash
   docker run -d --name investment -p 8082:8082 --restart=always \
     crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v1
   ```

---

### 🥉 方案3: 使用路径前缀（需要修改代码）

**访问地址**: `https://www.bizops.top/investment/`

**注意**: 此方案需要重新构建镜像（修改next.config.js）

**部署步骤**:

1. **修改Next.js配置**:
   ```bash
   # 使用路径前缀配置
   cp next.config.path-prefix.js next.config.js
   ```

2. **重新构建镜像**:
   ```bash
   docker build -t investment:v1 .
   docker tag investment:v1 crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v1
   docker push crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v1
   ```

3. **在现有Nginx配置中添加location**:
   ```bash
   # 编辑现有Nginx配置
   vim /etc/nginx/conf.d/现有配置文件.conf
   
   # 在现有的 server 块中添加（不要替换现有的 location /）
   # 复制 nginx-path-prefix.conf 中的内容
   ```

4. **重启Nginx**:
   ```bash
   nginx -t
   systemctl restart nginx
   ```

---

## 我的建议

**立即部署**: 使用**方案1（直接端口访问）**
- 最快、最安全
- 不影响现有服务
- 可以立即使用

**后续优化**: 配置**方案2（子域名）**
- 更专业
- URL更美观
- 完全独立

---

## 常见问题

### Q: 部署investment服务会影响现有的www.bizops.top服务吗？

**A: 不会！** 如果使用：
- 方案1（端口访问）: 完全独立，零影响
- 方案2（子域名）: 完全独立，零影响
- 方案3（路径前缀）: 正确配置后不影响，但需要小心

### Q: 现有服务会停止吗？

**A: 不会！** 所有方案都不会影响现有服务。

### Q: 需要停止现有服务吗？

**A: 不需要！** 可以直接部署，无需停止任何服务。

### Q: 如果使用路径前缀，现有服务的URL会改变吗？

**A: 不会！** 现有服务继续在根路径 `/` 下运行，investment服务在 `/investment/` 下运行。

---

## 快速开始（推荐方案1）

```bash
# 1. 登录ECS
ssh root@47.102.107.172

# 2. 登录阿里云镜像仓库
docker login --username=sunce@sharingtea.com crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms

# 3. 拉取镜像
docker pull crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v1

# 4. 运行容器
docker run -d \
  --name investment \
  -p 8082:8082 \
  --restart=always \
  crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v1

# 5. 验证
curl http://localhost:8082
```

访问: `http://47.102.107.172:8082`

---

## 需要帮助？

如果遇到问题，请检查：
1. 容器是否运行: `docker ps | grep investment`
2. 端口是否开放: `netstat -tlnp | grep 8082`
3. 防火墙规则: `firewall-cmd --list-ports`
4. 阿里云安全组: 确保8082端口已开放

