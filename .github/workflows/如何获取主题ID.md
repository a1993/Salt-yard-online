# 如何获取 Shopify 主题 ID

## 🎯 方法 1：从 Shopify 后台获取（最简单）

### 步骤：

1. **登录 Shopify 后台**
2. **进入**：在线商店 → 主题
3. **找到** `Salt-yard-online/main` 主题
4. **点击主题**进入详情页
5. **查看浏览器地址栏**，URL 格式如下：
   ```
   https://admin.shopify.com/store/your-store/themes/123456789
   ```
   其中 `123456789` 就是主题 ID

### 示例：

如果 URL 是：
```
https://admin.shopify.com/store/smka17-ff/themes/987654321
```

那么主题 ID 就是：`987654321`

---

## 🎯 方法 2：使用 Shopify CLI 获取

### 步骤：

1. **在本地终端运行**：
   ```bash
   shopify theme list --store=smka17-ff.myshopify.com --password=YOUR_TOKEN
   ```

2. **查找输出中的主题**：
   ```
   [Theme] Salt-yard-online/main
   ID: 987654321
   Role: unpublished
   ```

---

## 🎯 方法 3：使用 API 获取

### 使用 curl：

```bash
curl -X GET \
  "https://$SHOPIFY_STORE/admin/api/2024-01/themes.json" \
  -H "X-Shopify-Access-Token: $SHOPIFY_CLI_THEME_TOKEN"
```

### 响应示例：

```json
{
  "themes": [
    {
      "id": 987654321,
      "name": "Salt-yard-online/main",
      "role": "unpublished",
      ...
    }
  ]
}
```

---

## 📝 在 GitHub Actions 中使用

### 方式 1：在 workflow 输入中提供（推荐）

1. 进入 GitHub Actions
2. 选择 "Deploy to Shopify" workflow
3. 点击 "Run workflow"
4. 选择部署目标：`theme_id`
5. 在 "主题 ID" 输入框中输入主题 ID（例如：`987654321`）

### 方式 2：添加到 GitHub Secrets（固定主题）

如果你想固定使用某个主题，可以：

1. **添加 Secret**：
   - 名称：`SHOPIFY_THEME_ID`
   - 值：你的主题 ID（例如：`987654321`）

2. **更新 workflow** 使用这个 Secret：
   ```yaml
   --theme="${{ secrets.SHOPIFY_THEME_ID }}"
   ```

---

## ✅ 验证主题 ID

部署后，检查 Shopify 后台：
- 进入 在线商店 → 主题
- 找到 `Salt-yard-online/main` 主题
- 查看 "Last saved" 时间，应该是刚刚部署的时间

---

## 💡 提示

- ✅ **推荐使用主题 ID**：最精确，不会推送到错误的主题
- ⚠️ **主题 ID 不会改变**：除非删除主题后重新创建
- 📝 **记录主题 ID**：建议保存到文档中，方便以后使用


