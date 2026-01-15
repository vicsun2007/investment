# 平台不匹配问题处理

## 警告信息

```
WARNING: The requested image's platform (linux/arm64) does not match the detected host platform (linux/amd64/v4)
```

## 问题说明

- **镜像平台**: linux/arm64 (ARM架构，通常在M1/M2 Mac上构建)
- **ECS平台**: linux/amd64 (x86_64架构)

Docker会尝试通过模拟运行，但可能有性能问题或兼容性问题。

## 解决方案

### 方案1: 检查容器是否正常运行（先试试）

虽然警告，但容器可能仍能运行。先检查：

```bash
# 检查容器状态
docker ps | grep investment

# 查看日志
docker logs investment

# 测试访问
curl http://localhost:8082
```

如果容器正常运行且可以访问，可以暂时忽略警告。

### 方案2: 重新构建AMD64镜像（推荐）

在本地重新构建适用于AMD64平台的镜像：

#### 2.1 修改Dockerfile（如果需要）

确保Dockerfile支持多平台构建，或明确指定平台。

#### 2.2 使用buildx构建AMD64镜像

```bash
# 创建buildx构建器（如果还没有）
docker buildx create --name multiarch --use

# 构建AMD64镜像
docker buildx build --platform linux/amd64 -t investment:v1-amd64 .

# 或者直接构建并推送
docker buildx build --platform linux/amd64 \
  -t crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64 \
  --push .
```

#### 2.3 使用标准docker build（指定平台）

```bash
# 使用--platform参数
docker build --platform linux/amd64 -t investment:v1-amd64 .

# 打tag
docker tag investment:v1-amd64 crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64

# 推送
docker push crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64
```

### 方案3: 在ECS上直接构建（如果本地是ARM Mac）

如果本地是M1/M2 Mac，可以在ECS上直接构建：

```bash
# 在ECS上
cd /path/to/investment
docker build -t crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64 .
docker push crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64
```

## 立即检查

先执行以下命令检查当前容器是否正常工作：

```bash
# 1. 检查容器状态
docker ps | grep investment

# 2. 查看日志
docker logs investment

# 3. 测试访问
curl http://localhost:8082

# 4. 检查端口
netstat -tlnp | grep 8082
```

如果一切正常，可以暂时使用。如果出现问题，再重新构建AMD64镜像。

## 推荐操作

1. **先检查当前容器是否正常工作**
2. **如果正常**：可以继续使用，但建议后续重新构建AMD64镜像
3. **如果不正常**：立即重新构建AMD64镜像

