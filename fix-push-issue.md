# 解决镜像推送权限问题

## 问题分析

错误信息：`denied: requested access to the resource is denied`

可能的原因：
1. 仓库路径不正确
2. 需要在阿里云控制台先创建仓库
3. 权限不足

## 解决方案

### 方案1: 检查并创建仓库（推荐）

1. **登录阿里云控制台**
   - 进入：容器镜像服务 -> 个人版实例
   - 找到命名空间：`vicsun`
   - 检查是否有 `oms` 仓库，如果没有则创建

2. **创建仓库（如果不存在）**
   - 命名空间：`vicsun`
   - 仓库名称：`oms` 或 `investment`
   - 仓库类型：私有

### 方案2: 使用正确的仓库路径

根据阿里云个人版镜像仓库的格式，可能需要调整路径：

**当前使用的路径**：
```
crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v1
```

**可能的正确路径**：
```
crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/investment:v1
```

或者：
```
crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:v1
```

### 方案3: 检查登录的仓库地址

登录时使用的地址是：
```
crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms
```

这可能表示：
- 命名空间：`vicsun`
- 仓库名：`oms`

所以推送时应该是：
```
crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:v1
```

而不是：
```
crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms/investment:v1
```

## 建议的修复步骤

1. **确认仓库结构**
   - 在阿里云控制台查看 `vicsun` 命名空间下的仓库列表
   - 确认仓库名称是 `oms` 还是需要创建新仓库 `investment`

2. **根据实际情况选择路径**

   **如果仓库名是 `oms`**：
   ```bash
   docker tag investment:v1 crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:v1
   docker push crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:v1
   ```

   **如果需要创建新仓库 `investment`**：
   - 先在控制台创建仓库
   - 然后使用：
   ```bash
   docker tag investment:v1 crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/investment:v1
   docker push crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/investment:v1
   ```

3. **或者使用标签方式**
   如果 `oms` 仓库已存在，可以使用标签来区分：
   ```bash
   docker tag investment:v1 crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1
   docker push crpi-b2g3ygcjsyaexqo6.cn-shanghai.personal.cr.aliyuncs.com/vicsun/oms:investment-v1
   ```

