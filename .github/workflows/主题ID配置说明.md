# 主题 ID 配置说明

## 🎯 你的主题 ID

**主题名称**: `Salt-yard-online/main`  
**主题 ID**: `151735894173`

## 📝 配置方式

### 方式 1：GitHub Secrets（推荐，最安全）✅

**优点：**

- ✅ 安全：不会暴露在代码中
- ✅ 灵活：可以随时更改，不需要修改代码
- ✅ 符合最佳实践

**步骤：**

1. 进入 GitHub 仓库
2. 点击 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**
4. 名称：`SHOPIFY_THEME_ID`
5. 值：`151735894173`
6. 点击 **Add secret**

**使用：**

- 运行 workflow 时，选择 `theme_id`
- 会自动使用 Secret 中的主题 ID

---

### 方式 2：代码中配置（已配置）✅

**当前状态：**

- ✅ 已在 workflow 中设置默认主题 ID：`151735894173`
- ✅ 如果未设置 Secret 或输入，会自动使用这个默认值

**位置：**

```yaml
# .github/workflows/deploy.yml
THEME_ID="151735894173" # 默认主题 ID
```

**优先级：**

1. **最高**：workflow 输入中的主题 ID
2. **中等**：GitHub Secret `SHOPIFY_THEME_ID`
3. **最低**：代码中的默认值 `151735894173`

---

### 方式 3：每次手动输入

**步骤：**

1. 运行 workflow
2. 选择部署目标：`theme_id`
3. 在 "主题 ID" 输入框中输入：`151735894173`

---

## 🚀 使用方式

### 最简单的方式（推荐）

1. **添加到 GitHub Secrets**（一次设置，永久使用）
   - 名称：`SHOPIFY_THEME_ID`
   - 值：`151735894173`

2. **运行 workflow**
   - 选择部署目标：`theme_id`
   - 直接运行，无需输入主题 ID

### 或者直接使用默认值

- 代码中已配置默认主题 ID
- 直接运行 workflow，选择 `theme_id`
- 会自动使用 `151735894173`

---

## ✅ 验证配置

运行 workflow 后，检查日志：

```
✅ 正在部署到指定主题 (ID: 151735894173)
```

如果看到这个，说明配置成功！

---

## 🔄 如果主题 ID 改变了

### 如果使用 GitHub Secrets：

1. 进入 GitHub Secrets
2. 更新 `SHOPIFY_THEME_ID` 的值

### 如果使用代码配置：

1. 编辑 `.github/workflows/deploy.yml`
2. 更新默认主题 ID

---

## 💡 推荐方案

**最佳实践：使用 GitHub Secrets**

原因：

- ✅ 安全：不会暴露在代码中
- ✅ 灵活：可以随时更改
- ✅ 团队协作：不同成员可以使用不同的主题 ID

**当前配置：**

- ✅ 代码中已有默认值（作为后备）
- ✅ 支持从 GitHub Secrets 读取
- ✅ 支持手动输入

**建议：**

1. 添加到 GitHub Secrets（推荐）
2. 代码中的默认值作为后备方案

