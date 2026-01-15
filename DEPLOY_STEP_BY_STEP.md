# 方案1部署步骤 - 直接端口访问

## 部署概览

- **访问地址**: `http://47.102.107.172:8082`
- **端口**: 8082
- **不影响现有服务**: ✅ 完全独立

## 第一步：本地推送镜像到阿里云

### 1.1 登录阿里云镜像仓库

在本地终端执行（需要输入密码）：

```bash
docker login --username=sunce@sharingtea.com crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms
```

### 1.2 推送镜像

```bash
docker push crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1
```

### 1.3 验证推送（可选）

```bash
docker pull crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1
```

---

## 第二步：在ECS上部署

### 2.1 登录ECS服务器

```bash
ssh root@47.102.107.172
```

### 2.2 执行部署命令

**方式A：使用部署脚本（推荐）**

```bash
# 上传 ecs-deploy-commands.sh 到ECS，然后执行
chmod +x ecs-deploy-commands.sh
./ecs-deploy-commands.sh
```

**方式B：手动执行命令**

```bash
# 1. 登录阿里云镜像仓库
docker login --username=sunce@sharingtea.com crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms

# 2. 拉取镜像
docker pull crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1

# 3. 停止并删除旧容器（如果存在）
docker stop investment 2>/dev/null || true
docker rm investment 2>/dev/null || true

# 4. 运行新容器
docker run -d \
  --name investment \
  -p 8082:8082 \
  --restart=always \
  crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1

# 5. 检查容器状态
docker ps | grep investment

# 6. 查看日志
docker logs investment

# 7. 测试访问
curl http://localhost:8082
```

---

## 第三步：配置阿里云安全组

### 3.1 开放8082端口

1. 登录阿里云控制台
2. 进入 **ECS** -> **实例** -> 选择您的ECS实例
3. 点击 **安全组** -> **配置规则**
4. 点击 **添加安全组规则**
5. 配置如下：
   - **规则方向**: 入方向
   - **授权策略**: 允许
   - **协议类型**: TCP
   - **端口范围**: 8082/8082
   - **授权对象**: 0.0.0.0/0（或指定IP）
   - **描述**: Investment前端服务

6. 点击 **保存**

---

## 第四步：验证部署

### 4.1 在ECS上验证

```bash
# 检查容器状态
docker ps | grep investment

# 查看日志
docker logs -f investment

# 测试本地访问
curl http://localhost:8082
```

### 4.2 从外部访问

在浏览器中访问：
```
http://47.102.107.172:8082
```

应该能看到Investment前端界面。

---

## 常用管理命令

```bash
# 查看容器状态
docker ps | grep investment

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
docker pull crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1
docker stop investment
docker rm investment
docker run -d --name investment -p 8082:8082 --restart=always \
  crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1
```

---

## 故障排查

### 问题1: 容器无法启动

```bash
# 查看详细日志
docker logs investment

# 检查端口占用
netstat -tlnp | grep 8082

# 检查Docker状态
systemctl status docker
```

### 问题2: 无法从外部访问

1. **检查安全组**: 确保8082端口已开放
2. **检查防火墙**: 
   ```bash
   # CentOS/RHEL
   firewall-cmd --list-ports
   firewall-cmd --permanent --add-port=8082/tcp
   firewall-cmd --reload
   
   # Ubuntu/Debian
   ufw status
   ufw allow 8082/tcp
   ```
3. **检查容器状态**: `docker ps | grep investment`
4. **检查端口监听**: `netstat -tlnp | grep 8082`

### 问题3: 镜像拉取失败

```bash
# 重新登录
docker login --username=sunce@sharingtea.com crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms

# 检查网络连接
ping crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com
```

---

## 部署检查清单

- [ ] 本地镜像已构建
- [ ] 已登录阿里云镜像仓库
- [ ] 镜像已推送到阿里云
- [ ] 已登录ECS服务器
- [ ] ECS上已安装Docker
- [ ] 已在ECS上登录阿里云镜像仓库
- [ ] 镜像已拉取到ECS
- [ ] 容器已启动并运行
- [ ] 阿里云安全组已开放8082端口
- [ ] 可以从外部访问服务

---

## 完成！

部署完成后，访问地址：
- **内网**: http://localhost:8082
- **公网**: http://47.102.107.172:8082

**注意**: 此部署方案完全不影响现有的 www.bizops.top 服务！

