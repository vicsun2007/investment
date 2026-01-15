# 运行Investment容器

## 快速启动命令

在ECS上执行以下命令：

```bash
docker run -d \
  --name investment \
  -p 8082:8082 \
  --restart=always \
  crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1
```

## 详细步骤

### 1. 检查旧容器（如果存在）

```bash
# 查看是否有旧容器
docker ps -a | grep investment

# 如果有，先停止并删除
docker stop investment
docker rm investment
```

### 2. 运行新容器

```bash
docker run -d \
  --name investment \
  -p 8082:8082 \
  --restart=always \
  crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1
```

**参数说明**：
- `-d`: 后台运行
- `--name investment`: 容器名称
- `-p 8082:8082`: 端口映射（主机端口:容器端口）
- `--restart=always`: 自动重启（服务器重启后自动启动）
- 最后是镜像地址

### 3. 检查容器状态

```bash
# 查看运行中的容器
docker ps | grep investment

# 应该看到类似输出：
# CONTAINER ID   IMAGE                    STATUS         PORTS                    NAMES
# xxxxx          ...oms:investment-v1    Up X seconds   0.0.0.0:8082->8082/tcp  investment
```

### 4. 查看容器日志

```bash
# 查看所有日志
docker logs investment

# 实时查看日志（类似tail -f）
docker logs -f investment

# 查看最近50行日志
docker logs --tail 50 investment
```

### 5. 测试访问

```bash
# 在ECS上测试本地访问
curl http://localhost:8082

# 或者使用wget
wget -O- http://localhost:8082
```

### 6. 验证外部访问

在浏览器中访问：
```
http://47.102.107.172:8082
```

## 常用管理命令

### 查看容器状态
```bash
docker ps | grep investment
```

### 查看容器日志
```bash
# 实时日志
docker logs -f investment

# 最近100行
docker logs --tail 100 investment
```

### 重启容器
```bash
docker restart investment
```

### 停止容器
```bash
docker stop investment
```

### 启动容器
```bash
docker start investment
```

### 删除容器
```bash
# 先停止
docker stop investment

# 再删除
docker rm investment
```

### 进入容器（调试用）
```bash
docker exec -it investment sh
```

## 故障排查

### 问题1: 容器无法启动

```bash
# 查看详细日志
docker logs investment

# 检查端口占用
netstat -tlnp | grep 8082

# 检查容器状态
docker ps -a | grep investment
```

### 问题2: 端口已被占用

```bash
# 查看占用端口的进程
netstat -tlnp | grep 8082

# 或者使用lsof
lsof -i :8082

# 停止占用端口的进程，或使用其他端口
```

### 问题3: 无法从外部访问

1. **检查容器是否运行**：
   ```bash
   docker ps | grep investment
   ```

2. **检查端口监听**：
   ```bash
   netstat -tlnp | grep 8082
   ```

3. **检查防火墙**：
   ```bash
   # CentOS/RHEL
   firewall-cmd --list-ports
   firewall-cmd --permanent --add-port=8082/tcp
   firewall-cmd --reload
   
   # Ubuntu/Debian
   ufw status
   ufw allow 8082/tcp
   ```

4. **检查阿里云安全组**：
   - 登录阿里云控制台
   - ECS -> 实例 -> 安全组
   - 确保8082端口（TCP）已开放

### 问题4: 容器启动后立即退出

```bash
# 查看退出原因
docker logs investment

# 检查容器状态
docker ps -a | grep investment
```

## 使用部署脚本（推荐）

如果上传了 `run-container.sh` 脚本：

```bash
# 赋予执行权限
chmod +x run-container.sh

# 运行脚本
./run-container.sh
```

脚本会自动：
1. 检查并清理旧容器
2. 检查端口占用
3. 启动新容器
4. 验证容器状态
5. 测试服务访问

## 验证部署成功

部署成功后，您应该能够：

1. ✅ 看到容器运行：`docker ps | grep investment`
2. ✅ 本地访问正常：`curl http://localhost:8082`
3. ✅ 外部访问正常：浏览器打开 `http://47.102.107.172:8082`

## 完成！

如果一切正常，您应该能看到Investment前端界面了！

