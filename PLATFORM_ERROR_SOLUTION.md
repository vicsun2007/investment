# 平台错误解决方案

## 确认问题

错误信息：`exec format error`

**原因**：ARM64镜像在AMD64平台无法运行，二进制文件格式不兼容。

## 解决方案

### 方案1: 使用GitHub Actions构建（推荐）⭐

GitHub Actions可以自动构建AMD64镜像，无需本地网络。

#### 步骤1: 配置GitHub Secrets

1. 登录GitHub，进入项目仓库
2. Settings -> Secrets and variables -> Actions
3. 添加以下Secrets：
   - `ALIYUN_DOCKER_USERNAME`: `sunce@sharingtea.com`
   - `ALIYUN_DOCKER_PASSWORD`: 您的阿里云镜像仓库密码

#### 步骤2: 推送代码到GitHub

```bash
cd /Users/ce/Desktop/go/investment

# 初始化git（如果还没有）
git init
git add .
git commit -m "Initial commit"

# 添加GitHub远程仓库
git remote add origin https://github.com/您的用户名/您的仓库名.git
git push -u origin main
```

#### 步骤3: 触发构建

1. 在GitHub仓库页面，点击 "Actions"
2. 选择 "Build and Push AMD64 Image" 工作流
3. 点击 "Run workflow"
4. 等待构建完成

#### 步骤4: 在ECS上拉取

```bash
# 登录
docker login --username=sunce@sharingtea.com crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms

# 拉取AMD64镜像
docker pull crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64

# 停止旧容器
docker stop investment
docker rm investment

# 运行新镜像
docker run -d \
  --name investment \
  -p 8082:8082 \
  --restart=always \
  crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1-amd64
```

### 方案2: 等待网络恢复后构建

等网络恢复后，在本地或ECS上构建AMD64镜像。

### 方案3: 使用其他CI/CD服务

如果有其他CI/CD服务（GitLab CI、Jenkins等），可以在那里构建。

## 立即操作

### 1. 停止当前失败的容器

```bash
# 停止并删除容器
docker stop investment
docker rm investment
```

### 2. 使用GitHub Actions构建（推荐）

按照上面的步骤配置GitHub Actions，这是最快最可靠的方案。

## GitHub Actions配置说明

已创建 `.github/workflows/build-and-push.yml` 文件，包含：
- 自动构建AMD64镜像
- 推送到阿里云镜像仓库
- 支持手动触发和自动触发

只需要：
1. 配置GitHub Secrets
2. 推送代码到GitHub
3. 触发构建

