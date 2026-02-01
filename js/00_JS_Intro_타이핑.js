/**
 * 인트로 화면 - "결혼식에 초대합니다" salondeletter 스타일
 * clipPath + path 구조, stroke 애니메이션
 */
(function () {
    const HOLD_DURATION = 2000;

    function fadeOutIntro() {
        const introScreen = document.getElementById('introScreen');
        if (!introScreen) return;
        introScreen.classList.add('intro-fade-out');
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
        const strokePath = document.getElementById('introStrokePath');
        if (!introScreen || !strokePath) return;

        var pathLength = strokePath.getTotalLength();
        strokePath.style.strokeDasharray = pathLength;
        strokePath.style.strokeDashoffset = pathLength;
        strokePath.style.animation = 'intro-svg-draw 4000ms ease-out forwards';

        strokePath.addEventListener('animationend', function () {
            setTimeout(fadeOutIntro, HOLD_DURATION);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
