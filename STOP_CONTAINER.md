# 停止失败的容器

## 当前问题

容器不断重启，错误：`exec format error`（平台不匹配）

## 立即操作：停止容器

```bash
# 停止容器（不自动重启）
docker update --restart=no investment
docker stop investment

# 删除容器
docker rm investment

# 验证已删除
docker ps -a | grep investment
```

## 等待AMD64镜像

等AMD64镜像构建完成后，再运行新容器。

