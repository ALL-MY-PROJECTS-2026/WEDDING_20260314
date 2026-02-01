(function () {
  'use strict';

  var scrollHint = document.querySelector('.main_image_scroll_hint');
  if (!scrollHint) return;

  var hasScrolled = false;

  function handleScroll() {
    if (hasScrolled) return;
    
    if (window.scrollY > 50) {
      hasScrolled = true;
      scrollHint.classList.add('scroll-hide');
      window.removeEventListener('scroll', handleScroll);
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
})();
