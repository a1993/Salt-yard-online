# Salt Yard Online - Shopify Theme

这是 Salt Yard Online 的 Shopify 在线商店主题项目。

## 📋 目录

- [快速开始](#快速开始)
- [代码格式化](#代码规范)
- [Git 分支策略](#git-分支策略)
- [开发工作流](#开发工作流)
- [部署流程](#部署流程)
- [项目文档](#项目文档)

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- Shopify CLI
- Git

### 首次设置

````bash
# 1. 克隆仓库
git clone <repository-url>
cd Salt-yard-online

# 2. 安装依赖
npm install

# 3. 登录 Shopify
shopify auth login

# 4. 启动开发服务器

## 方式一：使用启动脚本（推荐）

**Windows (PowerShell):**
```powershell
.\start-dev.ps1
````

**macOS/Linux:**

```bash
chmod +x start-dev.sh  # 首次使用需要添加执行权限
./start-dev.sh
```

## 方式二：使用 npm 命令

```bash
npm run dev
```

访问: http://127.0.0.1:9292

> **提示**: 启动脚本已配置好环境变量和错误处理，推荐使用。如需配置代理，请编辑对应的启动脚本文件。

**详细设置指南**: 参见 [SETUP.md](SETUP.md)

## 🌿 Git 分支策略

本项目采用 **Git Flow** 简化版分支模型：

### 主要分支

1. **`main`** - 生产分支
   - 始终保持可部署状态
   - 对应 Shopify 线上环境
   - 只能通过 PR 合并
   - 受保护分支，需要代码审查

2. **`develop`** - 开发分支
   - 日常开发的主分支
   - 包含下一个发布版本的最新代码
   - 对应 Shopify 开发/预览主题

### 辅助分支

3. **`feature/*`** - 功能分支
   - 从 `develop` 创建
   - 用于开发新功能
   - 完成后合并回 `develop`
   - 命名示例：`feature/add-product-filter`, `feature/new-homepage`

4. **`hotfix/*`** - 紧急修复分支
   - 从 `main` 创建
   - 用于修复生产环境的紧急问题
   - 完成后合并到 `main` 和 `develop`
   - 命名示例：`hotfix/fix-checkout-bug`

5. **`release/*`** - 发布分支
   - 从 `develop` 创建
   - 用于准备新版本发布
   - 只进行 bug 修复和版本号更新
   - 完成后合并到 `main` 和 `develop`
   - 命名示例：`release/v1.2.0`

### 分支工作流示例

#### 开发新功能

```bash
# 1. 从 develop 创建功能分支
git checkout develop
git pull origin develop
git checkout -b feature/product-reviews

# 2. 开发和提交
git add .
git commit -m "feat: add product reviews section"

# 3. 推送到远程
git push origin feature/product-reviews

# 4. 创建 PR 到 develop
# 在 GitHub 上创建 Pull Request: feature/product-reviews → develop
```

#### 紧急修复

```bash
# 1. 从 main 创建 hotfix 分支
git checkout main
git pull origin main
git checkout -b hotfix/fix-cart-total

# 2. 修复和提交
git add .
git commit -m "fix: correct cart total calculation"

# 3. 推送并创建 PR
git push origin hotfix/fix-cart-total

# 4. 创建 PR 到 main 和 develop
```

#### 发布新版本

```bash
# 1. 从 develop 创建 release 分支
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0

# 2. 更新版本号和最后调整
# 编辑 package.json 版本号
git commit -am "chore: bump version to 1.2.0"

# 3. 合并到 main
git checkout main
git merge --no-ff release/v1.2.0
git tag -a v1.2.0 -m "Version 1.2.0"

# 4. 合并回 develop
git checkout develop
git merge --no-ff release/v1.2.0

# 5. 推送所有更改
git push origin main develop --tags
git branch -d release/v1.2.0
```

## 💻 开发工作流

### 1. 本地开发

```bash
# 启动开发服务器
npm run dev

# 开发服务器将在 http://127.0.0.1:9292 启动
```

### 2. 代码检查

```bash
# 运行所有检查
npm run lint

# 单独运行
npm run lint:liquid  # Liquid 模板检查
npm run lint:js      # JavaScript 检查
npm run lint:css     # CSS 检查
npm run format       # 代码格式化
```

### 3. 提交代码

```bash
# 1. 检查代码
npm run validate

# 2. 提交（使用约定式提交）
git add .
git commit -m "feat: your feature description"
```

### 提交信息规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

- `feat:` 新功能
- `fix:` Bug 修复
- `docs:` 文档更新
- `style:` 代码格式（不影响功能）
- `refactor:` 重构
- `perf:` 性能优化
- `test:` 测试相关
- `chore:` 构建/工具变更

**示例：**

```
feat: add customer reviews section to product page
fix: resolve mobile menu overlay issue
docs: update deployment instructions
style: format liquid templates
```

## 📏 代码规范

本项目使用自动化工具保持代码质量：

### 代码格式化

使用 **Prettier** 自动格式化所有代码：

```bash
# 格式化所有代码
npm run format

# 检查格式（不修改）
npm run format:check
```

详见 [FORMAT_GUIDE.md](FORMAT_GUIDE.md)

### 代码检查

```bash
# Liquid 模板检查
npm run lint:liquid

# JavaScript 检查
npm run lint:js

# 运行所有检查
npm run lint
```

### 一键验证

```bash
# 格式化 + 检查
npm run validate
```

**提交代码前，请运行 `npm run validate`**

## 🚀 部署流程

### 自动部署

当代码合并到 `main` 分支时，GitHub Actions 会自动触发部署。

### 手动部署

```bash
# 部署到开发主题
shopify theme push --development

# 部署到生产环境（谨慎操作！）
shopify theme push --live
```

### 部署检查清单

- [ ] 代码已通过所有检查（`npm run validate`）
- [ ] 已在本地开发环境测试
- [ ] PR 已获得审查批准
- [ ] 已备份当前线上主题
- [ ] 在预览主题测试无误

## 📦 项目结构

```
Salt-yard-online/
├── assets/          # 静态资源（JS, CSS, 图片）
├── config/          # 主题配置
├── layout/          # 布局模板
├── locales/         # 多语言翻译
├── sections/        # 可重用的页面区块
├── snippets/        # 可重用的代码片段
├── templates/       # 页面模板
└── .github/         # GitHub Actions 工作流
```

## 🔧 常用命令

### 启动开发服务器

```bash
# 方式一：使用启动脚本（推荐）
# Windows
.\start-dev.ps1

# macOS/Linux
./start-dev.sh

# 方式二：使用 npm 命令
npm run dev
```

### 其他命令

```bash
npm run format        # 格式化所有代码（自动修复格式问题）
npm run format:check  # 检查代码格式（不修改）
npm run lint          # 运行代码检查
npm run validate      # 格式化 + 检查（提交前运行）
npm run push          # 推送到 Shopify
npm run pull          # 从 Shopify 拉取
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

详见 [Pull Request 模板](.github/pull_request_template.md)

## 📚 项目文档

- [SETUP.md](SETUP.md) - 详细设置指南
- [FORMAT_GUIDE.md](FORMAT_GUIDE.md) - 代码格式化详解
- [QUICK_REFERENCE.md](QUICK_REFERENCE.md) - 快速参考（速查表）
- [CONTRIBUTING.md](CONTRIBUTING.md) - 贡献指南
- [CHANGELOG.md](CHANGELOG.md) - 更新日志
- [docs/GIT_WORKFLOW.md](docs/GIT_WORKFLOW.md) - Git 工作流详解
- [docs/CODE_STANDARDS.md](docs/CODE_STANDARDS.md) - 代码规范详解

## 📝 许可证

私有项目 - 保留所有权利

## 📞 联系方式

如有问题，请联系开发团队或创建 Issue。
