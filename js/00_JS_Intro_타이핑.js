/**
 * 인트로 화면 - "결혼식에 초대합니다" 타이핑 애니메이션
 */
(function () {
    const TEXT = '결혼식에\n초대합니다';
    const TYPING_SPEED = 200;
    const HOLD_DURATION = 1500;

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

    function typeText() {
        const typingElement = document.getElementById('introTyping');
        const cursorElement = document.getElementById('introCursor');
        if (!typingElement || !cursorElement) return;

        let index = 0;
        
        function addChar() {
            if (index < TEXT.length) {
                if (TEXT[index] === '\n') {
                    typingElement.innerHTML += '<br>';
                } else {
                    var currentText = typingElement.innerHTML;
                    typingElement.innerHTML = currentText + TEXT[index];
                }
                index++;
                setTimeout(addChar, TYPING_SPEED);
            } else {
                setTimeout(function() {
                    cursorElement.style.display = 'none';
                    fadeOutIntro();
                }, HOLD_DURATION);
            }
        }
        
        addChar();
    }

    function init() {
        const introScreen = document.getElementById('introScreen');
        if (!introScreen) return;
        
        setTimeout(typeText, 300);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
