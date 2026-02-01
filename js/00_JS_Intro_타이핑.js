/**
 * 인트로 화면 - "결혼식에 초대합니다" 한글자씩 타이핑 효과
 * salondeletter 스타일
 */
(function () {
    const INTRO_TEXT = '결혼식에 초대합니다';
    const TYPING_DELAY = 200;
    const HOLD_DURATION = 1200;

    function init() {
        const introScreen = document.getElementById('introScreen');
        const typingEl = document.getElementById('introTypingText');
        const cursorEl = document.getElementById('introCursor');

        if (!introScreen || !typingEl) return;

        const chars = INTRO_TEXT.split('');
        let index = 0;

        function typeNext() {
            if (index < chars.length) {
                typingEl.textContent += chars[index];
                index++;
                setTimeout(typeNext, TYPING_DELAY);
            } else {
                cursorEl.style.display = 'none';
                setTimeout(fadeOutIntro, HOLD_DURATION);
            }
        }

        function fadeOutIntro() {
            introScreen.classList.add('intro-fade-out');
            setTimeout(function () {
                introScreen.style.display = 'none';
            }, 800);
        }

        typeNext();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
