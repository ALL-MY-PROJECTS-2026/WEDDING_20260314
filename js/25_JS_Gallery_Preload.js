/**
 * 갤러리 이미지 preload 최적화
 * '사진더보기' 버튼 클릭 시 빠른 로딩을 위해 이미지 미리 로드
 */
(function() {
  'use strict';
  
  // 갤러리 블록이 뷰포트에 들어왔을 때 추가 이미지 preload
  var galleryBlock = document.querySelector('.wrapper>main>section:nth-child(5)>.gallery-block');
  if (!galleryBlock) return;
  
  // Intersection Observer로 갤러리 블록이 보일 때 추가 이미지 preload
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          // 갤러리 블록이 보이면 추가 이미지들 preload
          var hiddenImages = galleryBlock.querySelectorAll('.item.item-04 img, .item.item-05 img');
          hiddenImages.forEach(function(img) {
            if (img.complete === false) {
              // 이미지가 아직 로드되지 않았으면 preload
              var link = document.createElement('link');
              link.rel = 'preload';
              link.as = 'image';
              link.href = img.src;
              document.head.appendChild(link);
            }
          });
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '100px' }); // 100px 전에 미리 로드 시작
    
    observer.observe(galleryBlock);
  }
})();

