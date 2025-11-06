# 项目设置指南

快速设置 Salt Yard Online Shopify 主题开发环境。

## ⚡ 快速开始

### 1. 克隆仓库

```bash
git clone <repository-url>
cd Salt-yard-online
```

### 2. 安装依赖

```bash
npm install
```

这会安装：
- Shopify Theme Check（Liquid 检查）
- ESLint（JavaScript 检查）
- Prettier（代码格式化）

### 3. 配置 Shopify CLI

首次使用需要登录 Shopify：

```bash
shopify auth login
```

按提示完成认证。

### 4. 启动开发服务器

**Windows:**
```powershell
.\start-dev.ps1
```

**或使用 npm:**
```bash
npm run dev
```

访问: http://127.0.0.1:9292

## 🛠️ 编辑器设置（推荐 VS Code）

### 安装 VS Code 扩展

项目已包含推荐扩展配置（`.vscode/extensions.json`），打开项目时 VS Code 会提示安装：

1. **Prettier - Code formatter** - 代码格式化
2. **ESLint** - JavaScript 检查
3. **Shopify Liquid** - Liquid 语法高亮
4. **Shopify Theme Check** - Liquid 代码检查

### 自动格式化配置

项目已包含 VS Code 配置（`.vscode/settings.json`），会自动：
- ✅ 保存文件时格式化代码
- ✅ 使用 Prettier 作为默认格式化工具
- ✅ 自动修复 ESLint 问题

无需额外配置！

## 📝 日常开发流程

### 开发新功能

```bash
# 1. 创建功能分支
git checkout develop
git pull origin develop
git checkout -b feature/my-feature

# 2. 启动开发服务器
npm run dev

# 3. 编辑代码...
# VS Code 会在保存时自动格式化

# 4. 提交前验证
npm run validate

# 5. 提交
git add .
git commit -m "feat: add my feature"

# 6. 推送
git push origin feature/my-feature
```

### 常用命令

```bash
# 开发
npm run dev              # 启动开发服务器

# 代码质量
npm run format           # 格式化所有代码
npm run format:check     # 检查格式（不修改）
npm run lint             # 运行代码检查
npm run validate         # 格式化 + 检查

# Shopify
npm run push             # 推送到 Shopify
npm run pull             # 从 Shopify 拉取
npm run check            # Shopify 主题检查
```

## 🎯 代码格式化详解

### 自动格式化（推荐）

在 VS Code 中：
- **保存时自动格式化**: 已配置，保存即格式化
- **手动格式化**: `Shift + Alt + F`（Windows）/ `Shift + Option + F`（Mac）

### 命令行格式化

```bash
# 格式化所有文件
npm run format

# 格式化特定文件
npx prettier --write assets/main.js

# 格式化特定目录
npx prettier --write "assets/**/*.js"
```

### 格式化的内容

Prettier 会自动处理：
- ✅ 缩进（2 空格）
- ✅ 引号（单引号）
- ✅ 分号
- ✅ 行宽（100 字符）
- ✅ 换行符（LF）
- ✅ 尾随逗号
- ✅ 括号间距

**你只需关注代码逻辑，格式交给 Prettier！**

详细说明: [FORMAT_GUIDE.md](FORMAT_GUIDE.md)

## 🔍 代码检查

### Liquid 模板检查

```bash
npm run lint:liquid
```

检查：
- Liquid 语法错误
- 已废弃的标签和过滤器
- 性能问题
- 可访问性问题

### JavaScript 检查

```bash
npm run lint:js
```

检查：
- 语法错误
- 未使用的变量
- 未定义的变量
- 代码质量问题

### 一键验证

提交前运行：

```bash
npm run validate
```

这会：
1. 格式化所有代码（`npm run format`）
2. 运行 Liquid 检查（`npm run lint:liquid`）
3. 运行 JavaScript 检查（`npm run lint:js`）

## 🌿 Git 分支策略

项目使用 Git Flow 工作流：

### 主要分支

- **`main`** - 生产环境（线上主题）
- **`develop`** - 开发环境（下一版本）

### 功能分支

```bash
# 从 develop 创建
git checkout develop
git checkout -b feature/product-filter

# 开发完成后合并回 develop
# 通过 Pull Request
```

### 分支命名

```
feature/product-filter      # 新功能
fix/mobile-menu             # Bug 修复
hotfix/checkout-error       # 紧急修复
release/v1.2.0              # 版本发布
```

详细说明: [README.md - Git 分支策略](README.md#-git-分支策略)

## 📋 提交信息规范

使用约定式提交：

```
<type>(<scope>): <subject>
```

**类型：**
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式
- `refactor`: 重构
- `perf`: 性能优化
- `chore`: 构建/工具

**示例：**
```bash
git commit -m "feat(product): add size guide modal"
git commit -m "fix(cart): resolve quantity update issue"
git commit -m "docs: update README"
```

## 🚀 部署流程

### 推送到开发主题

```bash
npm run push
```

### 推送到生产环境

**⚠️ 谨慎操作！**

```bash
shopify theme push --live
```

或通过 GitHub Actions 自动部署（推送到 `main` 分支）。

## ❓ 常见问题

### Q: 代码格式总是不对？

A: 确保：
1. VS Code 已安装 Prettier 扩展
2. 保存文件时自动格式化已启用
3. 或手动运行 `npm run format`

### Q: Shopify CLI 连接失败？

A: 检查：
1. 网络连接
2. 是否需要配置代理（编辑 `start-dev.ps1`）
3. 重新登录：`shopify auth logout && shopify auth login`

### Q: 如何更新依赖？

A: 
```bash
# 检查过期的包
npm outdated

# 更新所有依赖
npm update

# 或更新特定包
npm update prettier
```

### Q: 如何禁用某段代码的格式化？

A: 使用特殊注释：

```javascript
// prettier-ignore
const ugly = { a:1,b:2,c:3 };
```

```liquid
{%- # prettier-ignore -%}
<div>{{ some | filters | on | one | line }}</div>
```

## 📚 更多文档

- [README.md](README.md) - 项目总览
- [FORMAT_GUIDE.md](FORMAT_GUIDE.md) - 格式化指南
- [CONTRIBUTING.md](CONTRIBUTING.md) - 贡献指南
- [docs/GIT_WORKFLOW.md](docs/GIT_WORKFLOW.md) - Git 工作流详解

## 🎉 开始开发

一切准备就绪！开始开发：

```bash
npm run dev
```

祝编码愉快！


