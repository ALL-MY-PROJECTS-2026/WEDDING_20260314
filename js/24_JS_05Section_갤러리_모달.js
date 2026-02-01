(function () {
  'use strict';

  var galleryImages = document.querySelectorAll('.gallery-img');
  var modalEl = document.getElementById('section_05_gallery_modal');
  var wrapperEl = document.getElementById('gallerySwiperWrapper');
  var galleryModal = null;
  var gallerySwiper = null;

  if (!galleryImages.length || !modalEl || !wrapperEl) return;

  function getImageSrcList() {
    var list = [];
    galleryImages.forEach(function (img) {
      list.push(img.getAttribute('src'));
    });
    return list;
  }

  function buildSwiperSlides(srcList) {
    return srcList
      .map(function (src) {
        return (
          '<div class="swiper-slide">' +
          '<img src="' + src + '" alt="">' +
          '</div>'
        );
      })
      .join('');
  }

  function openGalleryModal(initialIndex) {
    var srcList = getImageSrcList();
    wrapperEl.innerHTML = buildSwiperSlides(srcList);

    if (gallerySwiper) {
      gallerySwiper.destroy(true, true);
    }

    galleryModal = new bootstrap.Modal(modalEl, { backdrop: 'static', keyboard: false });
    galleryModal.show();

    modalEl.addEventListener('shown.bs.modal', function onShown() {
      modalEl.removeEventListener('shown.bs.modal', onShown);
      gallerySwiper = new Swiper('.gallery-swiper', {
        initialSlide: initialIndex,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    });
  }

  function handleClose() {
    if (gallerySwiper) {
      gallerySwiper.destroy(true, true);
      gallerySwiper = null;
    }
  }

  modalEl.addEventListener('hidden.bs.modal', handleClose);

  galleryImages.forEach(function (img, index) {
    img.addEventListener('click', function () {
      openGalleryModal(index);
    });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openGalleryModal(index);
      }
    });
  });
})();
