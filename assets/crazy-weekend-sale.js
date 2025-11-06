/**
 * Crazy Weekend Sale JavaScript
 * 疯狂周末特卖页面交互脚本
 */

(function() {
  'use strict';
  
  // 等待 DOM 加载完成
  document.addEventListener('DOMContentLoaded', function() {
    
    // 添加产品卡片点击追踪（可选）
    const productCards = document.querySelectorAll('.crazy-weekend-goods');
    
    productCards.forEach(function(card) {
      card.addEventListener('click', function(e) {
        // 可以在这里添加 Google Analytics 或其他追踪代码
        const productTitle = this.querySelector('h2')?.textContent || 'Unknown Product';
        console.log('Product clicked:', productTitle);
        
        // 如果需要，可以在这里添加自定义事件追踪
        // 例如: gtag('event', 'product_click', { product_name: productTitle });
      });
    });
    
    // 添加按钮悬停效果增强（可选）
    const shopButtons = document.querySelectorAll('.crazy-goods-btn');
    
    shopButtons.forEach(function(button) {
      button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
      });
      
      button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
    });
    
    // 懒加载图片优化（如果浏览器不支持原生懒加载）
    if ('loading' in HTMLImageElement.prototype === false) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      
      const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.removeAttribute('loading');
            observer.unobserve(img);
          }
        });
      });
      
      images.forEach(function(img) {
        imageObserver.observe(img);
      });
    }
  });
  
})();

