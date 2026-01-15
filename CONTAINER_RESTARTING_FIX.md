# 容器重启问题解决方案

## 问题
容器状态为 `Restarting (1)`，说明容器启动失败，不断重启。

## 可能的原因
1. **平台不匹配**：ARM64镜像在AMD64平台无法运行
2. **应用启动错误**：Next.js应用启动失败
3. **端口冲突**：8082端口被占用
4. **配置错误**：环境变量或配置问题

## 诊断步骤

### 1. 查看详细日志

```bash
# 查看完整日志
docker logs investment

# 查看最近100行
docker logs --tail 100 investment

# 实时查看日志
docker logs -f investment
```

### 2. 检查容器详细信息

```bash
# 查看容器状态
docker inspect investment | grep -A 10 "State"

# 查看退出代码
docker inspect investment --format 'ExitCode: {{.State.ExitCode}}'
```

### 3. 检查平台信息

```bash
# 查看镜像平台
docker image inspect crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1 --format '{{.Architecture}}/{{.Os}}'
```

## 解决方案

### 方案1: 如果是平台问题（最可能）

ARM64镜像在AMD64平台无法运行，需要AMD64镜像。

**由于网络问题无法构建，可以：**

#### A. 等待网络恢复后构建
等网络恢复后，在本地或ECS上构建AMD64镜像。

#### B. 使用其他有网络的机器构建
如果有其他可以访问Docker Hub的机器，在那里构建并推送。

#### C. 使用CI/CD环境
如果有CI/CD环境（如GitHub Actions、GitLab CI等），可以在那里构建。

### 方案2: 如果是应用启动错误

查看日志确认具体错误，可能是：
- Next.js配置问题
- 依赖缺失
- 端口问题

### 方案3: 临时停止容器

如果容器不断重启影响系统，可以临时停止：

```bash
# 停止容器（不自动重启）
docker update --restart=no investment
docker stop investment

# 查看日志分析问题
docker logs investment
```

## 立即操作

请先执行以下命令查看详细日志：

```bash
# 查看完整错误日志
docker logs investment

# 或者查看最近100行
docker logs --tail 100 investment
```

把日志内容发给我，我可以帮您分析具体问题。

## 如果确认是平台问题

需要构建AMD64镜像，但由于网络问题，可以：

1. **等待网络恢复**
2. **使用代理/VPN**
3. **在其他环境构建**（如GitHub Actions等CI/CD）

## 快速诊断命令

```bash
# 一键诊断
docker logs --tail 50 investment && \
docker inspect investment --format 'Status: {{.State.Status}}, ExitCode: {{.State.ExitCode}}' && \
docker image inspect crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1 --format 'Platform: {{.Architecture}}/{{.Os}}'
```

