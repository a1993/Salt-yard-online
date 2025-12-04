#!/bin/bash
# Shopify 主题开发启动脚本
# 使用方法: ./start-dev.sh

# 颜色定义
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
MAGENTA='\033[0;35m'
GRAY='\033[0;37m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${CYAN}================================${NC}"
echo -e "${CYAN}  Shopify 主题开发服务器启动${NC}"
echo -e "${CYAN}================================${NC}"
echo ""

# ============ 配置区域 ============

# 如果你有代理，取消下面两行的注释并修改代理地址
# export HTTP_PROXY="http://127.0.0.1:7890"
# export HTTPS_PROXY="http://127.0.0.1:7890"

# 禁用自动更新检查（防止网络超时导致崩溃）
export SHOPIFY_CLI_NO_UPDATE_NOTIFIER="1"

# 设置网络超时时间（秒）
export NODE_OPTIONS="--dns-result-order=ipv4first"

# 禁用分析和遥测（减少网络请求）
export SHOPIFY_CLI_NO_ANALYTICS="1"

# 商店名称（会自动从 .shopify-cli.yml 读取）
STORE="smka17-ff.myshopify.com"

# ============ 启动服务器 ============

echo -e "${GREEN}📦 商店: ${STORE}${NC}"
echo -e "${YELLOW}🚀 正在启动开发服务器...${NC}"
echo ""
echo -e "${MAGENTA}提示:${NC}"
echo -e "${GRAY}  - 按 Ctrl+C 停止服务器${NC}"
echo -e "${GRAY}  - 本地预览: http://127.0.0.1:9292${NC}"
echo -e "${GRAY}  - 修改文件会自动重载${NC}"
echo ""

# 启动开发服务器（添加更多容错参数）
shopify theme dev --store=$STORE --host=127.0.0.1 --port=9292

# 如果异常退出，显示错误信息
if [ $? -ne 0 ]; then
    echo ""
    echo -e "${RED}================================${NC}"
    echo -e "${RED}  服务器异常退出！${NC}"
    echo -e "${RED}================================${NC}"
    echo ""
    echo -e "${YELLOW}可能的原因:${NC}"
    echo -e "${GRAY}  1. 网络连接问题（ETIMEDOUT）${NC}"
    echo -e "${GRAY}  2. 需要配置代理${NC}"
    echo -e "${GRAY}  3. 商店密码错误${NC}"
    echo -e "${GRAY}  4. 认证过期${NC}"
    echo ""
    echo -e "${YELLOW}解决方法:${NC}"
    echo -e "${GRAY}  - 查看 '解决网络问题.md' 文件${NC}"
    echo -e "${GRAY}  - 配置代理后重试${NC}"
    echo -e "${GRAY}  - 运行: shopify auth logout 后重新登录${NC}"
    echo ""
    
    # 暂停以便查看错误
    echo -e "${CYAN}按任意键退出...${NC}"
    read -n 1 -s
fi

