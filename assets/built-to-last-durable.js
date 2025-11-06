/**
 * Built to Last: Durable Hair Systems JavaScript
 * 视频播放功能
 */

(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', function() {
    const MODAL_ID = 'durable-video-modal';
    
    // 绑定所有视频元素的点击事件
    const videoWrappers = document.querySelectorAll('[data-video]');
    videoWrappers.forEach(function(wrapper) {
      wrapper.addEventListener('click', function() {
        const videoUrl = this.getAttribute('data-video');
        if (videoUrl && typeof window.openVideoModal === 'function') {
          window.openVideoModal(MODAL_ID, videoUrl);
        }
      });
    });
  });
  
})();

