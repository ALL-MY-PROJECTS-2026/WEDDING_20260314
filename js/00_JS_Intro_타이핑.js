/**
 * 인트로 화면 - "결혼식에 초대합니다" 텍스트 표시
 */
(function () {
    const FADE_IN_DELAY = 300; // 텍스트 페이드인 딜레이 (CSS와 동일)
    const FADE_IN_DURATION = 1000; // 텍스트 페이드인 지속 시간 (CSS와 동일)
    const HOLD_DURATION = 2000; // 텍스트 표시 후 대기 시간

    function fadeOutIntro() {
        const introScreen = document.getElementById('introScreen');
        if (!introScreen) return;
        introScreen.classList.add('intro-fade-out');
        // 인트로가 페이드아웃 시작되면 하단 네비게이션 바 표시
        const mobileNavBar = document.querySelector('.mobile-nav-bar');
        if (mobileNavBar) {
            mobileNavBar.style.visibility = 'visible';
            mobileNavBar.style.opacity = '1';
            mobileNavBar.style.pointerEvents = 'auto';
        }
        setTimeout(function () {
            introScreen.classList.add('intro-hidden');
            if (introScreen.parentNode) {
                introScreen.parentNode.removeChild(introScreen);
            }
            var video = document.getElementById('introVideo');
            if (video) {
                video.load();
                video.play().catch(function(){});
            }
        }, 800);
    }

    function init() {
        const introScreen = document.getElementById('introScreen');
        if (!introScreen) return;
        
        // 텍스트 페이드인 완료 후 대기 시간을 두고 페이드아웃
        // 페이드인 딜레이(0.3s) + 페이드인 지속(1s) + 대기(2s) = 약 3.3초
        setTimeout(function() {
            fadeOutIntro();
        }, FADE_IN_DELAY + FADE_IN_DURATION + HOLD_DURATION);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
