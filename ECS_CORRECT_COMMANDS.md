# ECS部署 - 正确的命令

## ⚠️ 重要：使用正确的镜像路径

**错误的路径**（不要使用）：
```
crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v1
```

**正确的路径**（使用这个）：
```
crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1
```

## 在ECS上执行以下命令

### 1. 登录阿里云镜像仓库

```bash
docker login --username=sunce@sharingtea.com crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms
```

### 2. 拉取镜像（使用正确的路径）

```bash
docker pull crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1
```

### 3. 运行容器

```bash
docker run -d \
  --name investment \
  -p 8082:8082 \
  --restart=always \
  crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1
```

### 4. 检查状态

```bash
# 查看容器状态
docker ps | grep investment

# 查看日志
docker logs investment

# 测试访问
curl http://localhost:8082
```

## 路径说明

阿里云个人版镜像仓库的格式是：
```
registry/命名空间/仓库名:标签
```

所以：
- 命名空间：`vicsun`
- 仓库名：`oms`
- 标签：`investment-v1`

完整路径：`crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1`

## 验证镜像是否存在

如果拉取失败，可以先验证镜像是否存在：

```bash
# 登录后，尝试列出标签（如果支持）
# 或者直接尝试拉取
docker pull crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1
```

## 如果仍然失败

1. **检查登录状态**：
   ```bash
   docker login --username=sunce@sharingtea.com crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms
   ```

2. **检查网络连接**：
   ```bash
   ping crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com
   ```

3. **在阿里云控制台验证**：
   - 进入容器镜像服务
   - 查看 `vicsun/oms` 仓库
   - 确认标签 `investment-v1` 是否存在

