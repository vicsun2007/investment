#!/bin/bash

# 检查容器问题的脚本

echo "=========================================="
echo "检查Investment容器问题"
echo "=========================================="
echo ""

# 1. 查看容器状态
echo "1. 容器状态："
docker ps -a | grep investment
echo ""

# 2. 查看详细日志
echo "2. 容器日志（最近50行）："
docker logs --tail 50 investment 2>&1
echo ""

# 3. 查看容器退出代码
echo "3. 容器退出信息："
docker inspect investment --format '{{.State.Status}} - ExitCode: {{.State.ExitCode}}' 2>/dev/null
echo ""

# 4. 检查平台信息
echo "4. 镜像平台信息："
docker image inspect crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1 --format 'Platform: {{.Architecture}}/{{.Os}}' 2>/dev/null
echo ""

echo "=========================================="

