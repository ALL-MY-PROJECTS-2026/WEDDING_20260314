/**
 * 인트로 화면 - 통합 스크립트
 * SVG Stroke Drawing 효과 및 타이밍 제어
 */
(function () {
    // 타이밍 상수
    const FADE_IN_DELAY = 300; // 텍스트 페이드인 딜레이 (CSS와 동일)
    const FADE_IN_DURATION = 1000; // 텍스트 페이드인 지속 시간 (CSS와 동일)
    const HOLD_DURATION = 2000; // 텍스트 표시 후 대기 시간
    
    // SVG Drawing 상수
    const DRAW_DURATION = 4000; // 그려지는 애니메이션 지속 시간 (4초)

    /**
     * 인트로 화면 페이드아웃 처리
     */
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

    /**
     * SVG path를 한 획씩 그려지는 애니메이션 처리
     */
    function setupStrokeDrawing(svgElement) {
        // loading_g 그룹 안의 path 찾기
        const loadingGroup = svgElement.querySelector('.loading_g');
        if (!loadingGroup) {
            // loading_g가 없으면 모든 stroke path 찾기
            const paths = svgElement.querySelectorAll('path[stroke]');
            if (paths.length === 0) {
                console.warn('SVG path를 찾을 수 없습니다.');
                return 0;
            }
            return animatePath(paths[0]);
        }
        
        // loading_g 안의 path 찾기
        const paths = loadingGroup.querySelectorAll('path[stroke]');
        if (paths.length === 0) {
            console.warn('SVG path를 찾을 수 없습니다.');
            return 0;
        }
        
        // 첫 번째 path를 한 획씩 그려지게 처리
        return animatePath(paths[0]);
    }
    
    /**
     * Path를 한 획씩 그려지는 애니메이션 적용
     */
    function animatePath(path) {
        const pathLength = path.getTotalLength();
        
        if (pathLength === 0) {
            console.warn('Path의 길이가 0입니다.');
            return 0;
        }
        
        // stroke-dasharray와 stroke-dashoffset 설정
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;
        path.style.strokeLinecap = 'round';
        path.style.strokeLinejoin = 'round';
        path.style.opacity = '1';
        
        // CSS 변수 설정 (CSS 애니메이션에서 사용)
        path.style.setProperty('--path-length', pathLength);
        
        // CSS 애니메이션으로 한 획씩 그려지게 처리
        path.style.animation = `intro-svg-draw ${DRAW_DURATION}ms ease-out 0ms forwards`;
        
        return DRAW_DURATION; // 전체 애니메이션 완료 시간
    }

    /**
     * SVG 파일을 로드하고 인라인으로 삽입
     */
    async function loadAndSetupSVG() {
        const container = document.getElementById('introSvgContainer');
        if (!container) return;

        // file:// 프로토콜 체크 (CORS 문제 방지)
        const isFileProtocol = window.location.protocol === 'file:';
        
        try {
            // file:// 프로토콜에서는 fetch 대신 img 태그 사용
            if (isFileProtocol) {
                container.innerHTML = '<img src="./images/intro.svg" alt="결혼식에 초대합니다" class="intro-svg svg_handwritng">';
                return;
            }
            
            // SVG 파일을 fetch로 로드
            const response = await fetch('./images/intro.svg');
            if (!response.ok) {
                throw new Error('SVG 파일을 불러올 수 없습니다.');
            }
            const svgText = await response.text();
            
            // SVG 텍스트를 DOM으로 변환
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
            const svgElement = svgDoc.querySelector('svg');
            
            if (!svgElement) {
                throw new Error('SVG 요소를 찾을 수 없습니다.');
            }

            // SVG에 클래스 추가 및 스타일 설정
            svgElement.classList.add('intro-svg', 'svg_handwritng');
            svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            svgElement.setAttribute('aria-label', '결혼식에 초대합니다');
            
            // 컨테이너에 SVG 삽입
            container.appendChild(svgElement);
            
            // SVG가 DOM에 삽입된 후 stroke drawing 설정
            setTimeout(() => {
                const animationDuration = setupStrokeDrawing(svgElement);
            }, 100);
            
        } catch (error) {
            // 조용히 폴백 처리 (콘솔 오류 최소화)
            if (!isFileProtocol) {
                // file:// 프로토콜이 아닐 때만 경고 (개발 환경)
                console.warn('SVG 로드 실패, 이미지로 대체:', error.message);
            }
            // 실패 시 이미지 태그로 폴백
            container.innerHTML = '<img src="./images/intro.svg" alt="결혼식에 초대합니다" class="intro-svg svg_handwritng">';
        }
    }

    /**
     * 초기화 함수
     */
    function init() {
        const introScreen = document.getElementById('introScreen');
        if (!introScreen) return;
        
        // SVG 로드 및 설정
        loadAndSetupSVG();
        
        // 텍스트 페이드인 완료 후 대기 시간을 두고 페이드아웃
        // 페이드인 딜레이(0.3s) + 페이드인 지속(1s) + 대기(2s) = 약 3.3초
        setTimeout(function() {
            fadeOutIntro();
        }, FADE_IN_DELAY + FADE_IN_DURATION + HOLD_DURATION);
    }

    // DOM 로드 완료 후 실행
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
