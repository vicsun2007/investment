# ECS部署命令 - 最终版本

## ✅ 镜像已成功推送

**镜像地址**：
```
crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1
```

## 在ECS上执行以下命令

### 1. 登录ECS服务器

```bash
ssh root@47.102.107.172
```

### 2. 登录阿里云镜像仓库

```bash
docker login --username=sunce@sharingtea.com crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms
```

### 3. 拉取镜像

```bash
docker pull crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1
```

### 4. 运行容器

```bash
docker run -d \
  --name investment \
  -p 8082:8082 \
  --restart=always \
  crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1
```

### 5. 检查状态

```bash
# 查看容器状态
docker ps | grep investment

# 查看日志
docker logs investment

# 测试访问
curl http://localhost:8082
```

### 6. 配置阿里云安全组

在阿里云控制台：
1. ECS -> 实例 -> 选择您的ECS
2. 安全组 -> 配置规则 -> 添加安全组规则
3. 配置：
   - 规则方向: 入方向
   - 协议类型: TCP
   - 端口范围: 8082/8082
   - 授权对象: 0.0.0.0/0

## 访问地址

部署完成后访问：
- **内网**: http://localhost:8082
- **公网**: http://47.102.107.172:8082

## 常用管理命令

```bash
# 查看容器状态
docker ps | grep investment

# 查看日志
docker logs -f investment

# 重启容器
docker restart investment

# 停止容器
docker stop investment

# 启动容器
docker start investment

# 更新镜像
docker pull crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1
docker stop investment
docker rm investment
docker run -d --name investment -p 8082:8082 --restart=always \
  crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1
```

## ✅ 完成！

镜像已成功推送到阿里云，现在可以在ECS上部署了！

