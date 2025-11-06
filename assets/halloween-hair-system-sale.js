/**
 * Halloween Hair System Sale JavaScript
 * 产品滑动展示功能
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    // 初始化所有滑动容器
    const swiperContainers = document.querySelectorAll('.halloween-swiper-container');

    swiperContainers.forEach(function (container, index) {
      const wrapper = container.querySelector('.halloween-swiper-wrapper');
      const prevButton = container.querySelector('.halloween-swiper-button-prev');
      const nextButton = container.querySelector('.halloween-swiper-button-next');

      if (!wrapper || !prevButton || !nextButton) return;

      // 滑动函数
      function scroll(direction) {
        const slideWidth = wrapper.querySelector('.halloween-swiper-slide')?.offsetWidth || 280;
        const gap = 24; // 1.5rem gap
        const scrollAmount = (slideWidth + gap) * 3; // 一次滚动3个产品

        if (direction === 'next') {
          wrapper.scrollLeft += scrollAmount;
        } else {
          wrapper.scrollLeft -= scrollAmount;
        }

        // 延迟更新按钮状态
        setTimeout(updateButtons, 300);
      }

      // 更新按钮状态
      function updateButtons() {
        const isAtStart = wrapper.scrollLeft <= 0;
        const isAtEnd = wrapper.scrollLeft >= wrapper.scrollWidth - wrapper.clientWidth - 10;

        if (isAtStart) {
          prevButton.classList.add('disabled');
        } else {
          prevButton.classList.remove('disabled');
        }

        if (isAtEnd) {
          nextButton.classList.add('disabled');
        } else {
          nextButton.classList.remove('disabled');
        }
      }

      // 绑定按钮点击事件
      prevButton.addEventListener('click', function () {
        if (!this.classList.contains('disabled')) {
          scroll('prev');
        }
      });

      nextButton.addEventListener('click', function () {
        if (!this.classList.contains('disabled')) {
          scroll('next');
        }
      });

      // 监听滚动事件
      wrapper.addEventListener('scroll', updateButtons);

      // 初始化按钮状态
      updateButtons();

      // 触摸滑动支持
      let touchStartX = 0;
      let scrollStartX = 0;

      wrapper.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
        scrollStartX = wrapper.scrollLeft;
      });

      wrapper.addEventListener('touchmove', function (e) {
        const touchX = e.touches[0].clientX;
        const diff = touchStartX - touchX;
        wrapper.scrollLeft = scrollStartX + diff;
      });
    });

    // 响应式处理
    function handleResize() {
      const containers = document.querySelectorAll('.halloween-swiper-container');
      containers.forEach(function (container) {
        const wrapper = container.querySelector('.halloween-swiper-wrapper');
        if (wrapper) {
          const prevButton = container.querySelector('.halloween-swiper-button-prev');
          const nextButton = container.querySelector('.halloween-swiper-button-next');

          // 更新按钮状态
          if (prevButton && nextButton) {
            const isAtStart = wrapper.scrollLeft <= 0;
            const isAtEnd = wrapper.scrollLeft >= wrapper.scrollWidth - wrapper.clientWidth - 10;

            prevButton.classList.toggle('disabled', isAtStart);
            nextButton.classList.toggle('disabled', isAtEnd);
          }
        }
      });
    }

    // 监听窗口大小变化
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 250);
    });
  });
})();
