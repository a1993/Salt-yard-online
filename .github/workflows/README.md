# GitHub Actions 配置说明

## 🔐 设置 GitHub Secrets

在 GitHub 仓库中设置以下 Secrets：

### 1. 进入仓库设置

- 点击仓库的 **Settings** → **Secrets and variables** → **Actions**

### 2. 添加以下 Secrets

#### `SHOPIFY_STORE`

- **值**: 你的商店域名（例如：`smka17-ff.myshopify.com`）
- **说明**: 不需要 `https://` 前缀

#### `SHOPIFY_CLI_THEME_TOKEN`

- **值**: Shopify Theme API 访问令牌
- **获取方法**:
  1. 登录 Shopify 后台
  2. 进入 **设置** → **应用和销售渠道**
  3. 点击 **开发应用**
  4. 创建新应用或使用现有应用
  5. 配置权限：
     - ✅ `read_themes`
     - ✅ `write_themes`
  6. 安装应用并获取访问令牌

#### `SHOPIFY_THEME_ID`（可选，推荐）

- **值**: `Salt-yard-online/main` 主题的 ID
- **获取方法**:
  1. 在 Shopify 后台进入 **在线商店** → **主题**
  2. 找到 `Salt-yard-online/main` 主题
  3. 点击主题进入详情页
  4. 查看浏览器地址栏，URL 中的数字就是主题 ID
  5. 例如：`.../themes/123456789` 中的 `123456789`
- **说明**:
  - 如果设置了此 Secret，workflow 会自动使用这个主题 ID
  - 如果未设置，需要在运行 workflow 时手动输入主题 ID

### 3. 验证设置

运行 workflow 后，检查日志中是否有：

```
✅ 环境变量已设置
商店: your-store.myshopify.com
```

如果看到 `❌ 错误: SHOPIFY_CLI_THEME_TOKEN 未设置`，说明 Secrets 未正确配置。

## 🔄 更新过期的 Token

如果遇到 401 错误（Invalid API key or access token）：

1. 重新生成 Theme API Token
2. 在 GitHub Secrets 中更新 `SHOPIFY_CLI_THEME_TOKEN`
3. 重新运行 workflow

## 📝 注意事项

- ⚠️ **不要**将 Token 提交到代码仓库
- ✅ 使用 GitHub Secrets 安全存储
- ✅ Token 过期后需要更新

## 🔧 常见错误解决

### 错误：Failed to prompt: Select a theme to push to

**原因：** 在 CI 环境中无法交互式选择主题

**解决方案：**

- 使用 `--live` 或 `--development` 明确指定主题类型
- 或使用 `--theme=<THEME_ID>` 指定具体主题 ID

**已修复：** workflow 中已使用 `--live` 和 `--development` 参数
