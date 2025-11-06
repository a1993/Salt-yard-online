/**
 * Flash Sale JavaScript
 * Tab 切换功能
 */

(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', function() {
    
    // 获取所有 tab 按钮和内容
    const tabButtons = document.querySelectorAll('.flash-sale-tab-btn');
    const tabPanes = document.querySelectorAll('.flash-sale-tab-pane');
    
    if (!tabButtons.length || !tabPanes.length) return;
    
    // Tab 切换函数
    function switchTab(targetTabIndex) {
      // 移除所有 active 状态
      tabButtons.forEach(function(btn) {
        btn.classList.remove('active');
      });
      
      tabPanes.forEach(function(pane) {
        pane.classList.remove('active');
      });
      
      // 添加 active 状态到目标 tab
      const targetButton = document.querySelector('[data-tab-index="' + targetTabIndex + '"]');
      const targetPane = document.querySelector('[data-tab-content="' + targetTabIndex + '"]');
      
      if (targetButton && targetPane) {
        targetButton.classList.add('active');
        targetPane.classList.add('active');
      }
    }
    
    // 绑定点击事件
    tabButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const tabIndex = this.getAttribute('data-tab-index');
        if (tabIndex) {
          switchTab(tabIndex);
          
          // 滚动到产品网格顶部（可选）
          const container = document.querySelector('.flash-sale-tabs-content');
          if (container && window.innerWidth < 768) {
            setTimeout(function() {
              container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
          }
        }
      });
    });
    
    // 键盘导航支持
    tabButtons.forEach(function(button, index) {
      button.addEventListener('keydown', function(e) {
        let targetIndex;
        
        // 左箭头
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          targetIndex = index > 0 ? index - 1 : tabButtons.length - 1;
        }
        // 右箭头
        else if (e.key === 'ArrowRight') {
          e.preventDefault();
          targetIndex = index < tabButtons.length - 1 ? index + 1 : 0;
        }
        
        if (targetIndex !== undefined) {
          tabButtons[targetIndex].focus();
          tabButtons[targetIndex].click();
        }
      });
    });
    
  });
  
})();

