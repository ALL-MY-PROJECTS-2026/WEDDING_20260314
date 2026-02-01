/**
 * 바텀시트 - 메뉴 클릭 시 퀵메뉴 표시
 */
(function(){
    var bottomSheet = document.getElementById('quickMenuBottomSheet');
    var backdrop = document.getElementById('quickMenuBackdrop');
    var menuBtn = document.querySelector('.mobile-nav-bar__item--menu');
    var quickLinks = document.querySelectorAll('.bottom-sheet__link');

    function openBottomSheet(){
        if (bottomSheet) bottomSheet.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }
    function closeBottomSheet(){
        if (bottomSheet) bottomSheet.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', function(e){
            e.preventDefault();
            openBottomSheet();
        });
    }
    if (backdrop) {
        backdrop.addEventListener('click', closeBottomSheet);
    }
    quickLinks.forEach(function(link){
        link.addEventListener('click', function(e){
            var href = this.getAttribute('href');
            if (href && href.indexOf('#') === 0) {
                e.preventDefault();
                var target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
                closeBottomSheet();
            }
        });
    });
})();
