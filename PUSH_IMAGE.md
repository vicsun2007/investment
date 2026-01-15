# 推送镜像到阿里云指南

## 步骤说明

### 1. 登录阿里云镜像仓库

请在终端手动执行以下命令（需要交互式输入密码）：

```bash
docker login --username=sunce@sharingtea.com crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms
```

输入密码后，登录成功会显示 "Login Succeeded"

### 2. 推送镜像

登录成功后，执行以下命令推送镜像：

```bash
docker push crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v1
```

### 3. 验证推送

推送完成后，可以执行以下命令验证：

```bash
# 拉取镜像验证（可选）
docker pull crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v1

# 或者在阿里云控制台查看镜像
```

## 当前镜像信息

- **本地镜像**: `investment:v1`
- **远程镜像**: `crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v1`
- **镜像大小**: 约 146MB

## 快速命令

```bash
# 一键执行（需要先登录）
docker push crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v1
```

