# 投资分析工具 - Alpha VC Intelligence Hub

基于AI的投资分析和研究平台，专为PE/VC机构设计，帮助投资团队进行投资分析、知识沉淀和能力积累。

## 功能特性

### 核心模块

1. **仪表盘 (Dashboard)**
   - 研究报告统计
   - AI效率指标
   - 团队能力积累可视化
   - AI模型性能监控
   - 最近研究活动

2. **报告管理 (Reports)**
   - 报告上传（PDF、XLSX、CSV）
   - 报告列表和搜索
   - 报告分类与标签
   - 报告详情查看

3. **提示词工厂 (Prompt Factory)**
   - 高价值提示词模板管理
   - 结构化提示词构建器
   - 关键指标选择（CAGR、TAM、Burn Rate等）
   - 分析焦点配置
   - 模板评分和使用统计

4. **知识库 (Knowledge Hub)**
   - 投资判断经验积累
   - 项目延续性要点
   - 知识检索与关联
   - 知识图谱可视化

5. **AI分析工作区 (Workspace)**
   - 文档上传与管理
   - AI模型选择（OpenAI/Gemini/元宝/豆包/千问）
   - 交互式AI分析
   - 提示词构建与应用
   - 分析结果展示与编辑

## 技术栈

- **框架**: Next.js 14+ (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **图标**: Lucide React
- **HTTP客户端**: Axios
- **表格**: TanStack Table
- **图表**: Recharts

## 项目结构

```
investment/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页（仪表盘）
│   ├── reports/           # 报告管理页面
│   ├── prompt-factory/    # 提示词工厂页面
│   └── workspace/         # AI工作区页面
├── components/            # React组件
│   ├── Sidebar.tsx       # 侧边栏导航
│   ├── Header.tsx        # 顶部导航栏
│   ├── Dashboard.tsx     # 仪表盘组件
│   ├── ReportsPage.tsx   # 报告管理页面
│   ├── PromptFactoryPage.tsx  # 提示词工厂页面
│   └── WorkspacePage.tsx # AI工作区页面
├── TECHNICAL_PLAN.md     # 技术方案文档
└── package.json          # 项目依赖
```

## 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发模式

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 页面说明

### 1. 仪表盘 (/)
- 展示关键指标卡片（总报告数、平均质量评分、AI效率、已验证洞察）
- 团队投资能力积累图表
- AI模型性能统计
- 最近研究报告列表

### 2. 报告管理 (/reports)
- 报告上传功能
- 报告列表展示
- 搜索和筛选
- 报告详情查看

### 3. 提示词工厂 (/prompt-factory)
- 高价值提示词模板展示
- 模板分类和筛选
- 知识库条目展示
- 模板详情和使用统计

### 4. AI工作区 (/workspace)
- 左侧：上下文库和最近文档
- 中间：AI对话界面
- 右侧：提示词工厂和保存的模板

## 设计风格

- **主题**: 深色模式
- **主色调**: 蓝色（#3b82f6）
- **布局**: 左侧导航栏 + 顶部栏 + 主内容区
- **组件风格**: 卡片式布局，圆角设计

## 开发计划

### Phase 1: 基础架构 ✅
- [x] Next.js项目初始化
- [x] TypeScript配置
- [x] Tailwind CSS样式系统
- [x] 基础组件库

### Phase 2: 核心功能 ✅
- [x] 用户界面布局
- [x] 仪表盘页面
- [x] 报告管理页面
- [x] 提示词工厂页面
- [x] AI工作区页面

### Phase 3: 高级功能 (待开发)
- [ ] 后端API集成
- [ ] 文件上传功能
- [ ] AI模型调用
- [ ] 报告生成和编辑
- [ ] 知识库功能
- [ ] 用户认证和权限

### Phase 4: 优化与集成 (待开发)
- [ ] 性能优化
- [ ] 外部系统集成
- [ ] 多语言支持
- [ ] 测试覆盖
- [ ] 部署配置

## 业务模块说明

详细的技术方案和业务模块划分请参考 [TECHNICAL_PLAN.md](./TECHNICAL_PLAN.md)

## 许可证

MIT

