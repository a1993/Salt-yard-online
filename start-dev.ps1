# Shopify 主题开发启动脚本
# 使用方法: .\start-dev.ps1

Write-Host "================================" -ForegroundColor Cyan
Write-Host "  Shopify 主题开发服务器启动" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# ============ 配置区域 ============

# 如果你有代理，取消下面两行的注释并修改代理地址
# $env:HTTP_PROXY="http://127.0.0.1:7890"
# $env:HTTPS_PROXY="http://127.0.0.1:7890"

# 禁用自动更新检查（防止网络超时导致崩溃）
$env:SHOPIFY_CLI_NO_UPDATE_NOTIFIER="1"

# 设置网络超时时间（秒）
$env:NODE_OPTIONS="--dns-result-order=ipv4first"

# 禁用分析和遥测（减少网络请求）
$env:SHOPIFY_CLI_NO_ANALYTICS="1"

# 商店名称（会自动从 .shopify-cli.yml 读取）
$STORE = "smka17-ff.myshopify.com"

# ============ 启动服务器 ============

Write-Host "📦 商店: $STORE" -ForegroundColor Green
Write-Host "🚀 正在启动开发服务器..." -ForegroundColor Yellow
Write-Host ""
Write-Host "提示:" -ForegroundColor Magenta
Write-Host "  - 按 Ctrl+C 停止服务器" -ForegroundColor Gray
Write-Host "  - 本地预览: http://127.0.0.1:9292" -ForegroundColor Gray
Write-Host "  - 修改文件会自动重载" -ForegroundColor Gray
Write-Host ""

# 启动开发服务器（添加更多容错参数）
shopify theme dev --store=$STORE --host=127.0.0.1 --port=9292

# 如果异常退出，显示错误信息
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "================================" -ForegroundColor Red
    Write-Host "  服务器异常退出！" -ForegroundColor Red
    Write-Host "================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "可能的原因:" -ForegroundColor Yellow
    Write-Host "  1. 网络连接问题（ETIMEDOUT）" -ForegroundColor Gray
    Write-Host "  2. 需要配置代理" -ForegroundColor Gray
    Write-Host "  3. 商店密码错误" -ForegroundColor Gray
    Write-Host "  4. 认证过期" -ForegroundColor Gray
    Write-Host ""
    Write-Host "解决方法:" -ForegroundColor Yellow
    Write-Host "  - 查看 '解决网络问题.md' 文件" -ForegroundColor Gray
    Write-Host "  - 配置代理后重试" -ForegroundColor Gray
    Write-Host "  - 运行: shopify auth logout 后重新登录" -ForegroundColor Gray
    Write-Host ""
    
    # 暂停以便查看错误
    Write-Host "按任意键退出..." -ForegroundColor Cyan
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

