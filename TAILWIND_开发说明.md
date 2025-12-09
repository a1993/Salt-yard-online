# Tailwind CSS 开发说明

## 🤔 为什么这样设计？

### 1. 为什么 `tailwind.output.css` 被 `.gitignore` 忽略？

**原因：**

- ✅ **构建产物**：这是由 `tailwind.css` 自动生成的，不应该提交到 Git
- ✅ **避免冲突**：不同开发者构建的文件可能略有不同，避免合并冲突
- ✅ **文件大小**：构建后的文件可能很大，不需要版本控制
- ✅ **可重现性**：任何人都可以通过 `npm run build:css` 重新生成

**类比：** 就像 `node_modules/` 一样，不需要提交，但需要存在才能运行。

### 2. 为什么在 GitHub Actions 中构建？

**原因：**

- ✅ **CI/CD 流程**：部署前必须构建最新的 CSS
- ✅ **自动化**：确保每次部署都有最新的样式
- ✅ **一致性**：在干净的环境中构建，避免本地环境差异

### 3. 本地 watch 可以吗？

**✅ 完全可以！而且推荐！**

本地开发时应该使用 `npm run watch:css`，这样：

- ✅ 修改文件后自动重新构建
- ✅ 实时看到样式变化
- ✅ 开发体验更好

## 📋 开发工作流程

### 方式一：本地开发（推荐）

```bash
# 终端 1：启动 Tailwind 监听
npm run watch:css

# 终端 2：启动 Shopify 开发服务器
npm run dev
# 或
./start-dev.sh  # 现在会自动启动 Tailwind watch
```

**优点：**

- ✅ 修改 Liquid 文件后，Tailwind 自动检测并重新构建
- ✅ 实时预览样式变化
- ✅ 开发效率高

### 方式二：手动构建

```bash
# 每次修改后手动构建
npm run build:css
```

**适用场景：**

- 偶尔使用 Tailwind 类
- 不需要实时预览

## ⚠️ Shopify 后台编辑的问题

### 问题描述

如果你在 **Shopify 后台编辑器** 中编辑代码：

- ❌ 本地 `watch:css` **不会检测到**（因为文件在 Shopify 服务器上）
- ❌ 样式不会自动更新

### 解决方案

#### 方案 1：从 Shopify 拉取代码（推荐）

```bash
# 1. 从 Shopify 拉取最新代码
npm run pull

# 2. 重新构建 CSS
npm run build:css

# 3. 继续开发
npm run watch:css
```

#### 方案 2：避免在后台编辑

**最佳实践：**

- ✅ 在本地编辑代码
- ✅ 使用 `shopify theme dev` 实时预览
- ✅ 只在必要时在后台编辑

#### 方案 3：使用 Shopify CLI 同步

```bash
# 开发时使用 dev 模式，会自动同步
shopify theme dev
```

## 🔄 完整工作流程

### 日常开发

```bash
# 1. 启动开发环境（自动启动 Tailwind watch）
./start-dev.sh

# 2. 在本地编辑代码
# - 修改 layout/theme.liquid
# - 添加 Tailwind 类：class="bg-blue-500"
# - Tailwind 自动检测并重新构建

# 3. 在浏览器中查看效果
# http://127.0.0.1:9292
```

### 部署前

```bash
# 1. 确保 CSS 已构建（watch 模式会自动构建）
# 或者手动构建
npm run build:css

# 2. 提交代码（tailwind.output.css 不会被提交，这是正确的）
git add .
git commit -m "更新样式"
git push

# 3. GitHub Actions 会自动：
#    - 构建 CSS
#    - 部署到 Shopify
```

### 从 Shopify 后台编辑后

```bash
# 1. 拉取 Shopify 上的更改
npm run pull

# 2. 重新构建 CSS（因为可能有新的 Tailwind 类）
npm run build:css

# 3. 继续开发
npm run watch:css
```

## 🎯 总结

| 场景         | 操作                                 | 说明                  |
| ------------ | ------------------------------------ | --------------------- |
| **本地开发** | `npm run watch:css`                  | ✅ 自动监听，实时构建 |
| **手动构建** | `npm run build:css`                  | ✅ 一次性构建         |
| **部署**     | GitHub Actions 自动构建              | ✅ CI/CD 流程         |
| **后台编辑** | `npm run pull` + `npm run build:css` | ⚠️ 需要手动同步       |

## 💡 最佳实践

1. **开发时**：始终运行 `watch:css` 或使用 `./start-dev.sh`
2. **提交前**：确保 CSS 已构建（watch 模式会自动构建）
3. **部署时**：GitHub Actions 会自动构建，无需担心
4. **后台编辑**：尽量避免，或记得拉取后重新构建

## ❓ 常见问题

### Q: 为什么我的样式不生效？

**A:** 检查以下几点：

1. ✅ 是否运行了 `npm run build:css` 或 `npm run watch:css`？
2. ✅ `tailwind.output.css` 文件是否存在？
3. ✅ 浏览器是否缓存了旧文件？（尝试硬刷新 Ctrl+Shift+R）

### Q: 我可以提交 `tailwind.output.css` 吗？

**A:** 不推荐。原因：

- 它是构建产物，不是源代码
- 不同环境构建可能略有不同
- 会增加 Git 仓库大小
- CI/CD 会自动构建

### Q: 在 Shopify 后台编辑后怎么办？

**A:**

1. 运行 `npm run pull` 拉取代码
2. 运行 `npm run build:css` 重新构建
3. 继续开发

### Q: watch 模式不工作？

**A:** 检查：

1. ✅ PostCSS 是否正确安装：`npm install`
2. ✅ 文件路径是否正确
3. ✅ 是否有权限问题
