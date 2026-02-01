/**
 * 인트로 화면 - SVG Stroke Drawing 효과
 * SVG path가 순차적으로 그려지는 우아한 애니메이션
 */
(function () {
    const DRAW_DURATION = 4000; // 그려지는 애니메이션 지속 시간 (4초)
    const PATH_DELAY = 200; // 각 path 간 딜레이 (0.2초)

    /**
     * SVG path의 길이를 계산하고 stroke-dasharray 설정
     */
    function setupStrokeDrawing(svgElement) {
        // 실제로 그려지는 path는 loading_g 그룹 안에 있음
        const loadingGroup = svgElement.querySelector('.loading_g');
        if (!loadingGroup) {
            // loading_g가 없으면 모든 stroke path 찾기
            const paths = svgElement.querySelectorAll('path[stroke]');
            if (paths.length === 0) {
                console.warn('SVG path를 찾을 수 없습니다.');
                return 0;
            }
            return animatePaths(paths);
        }
        
        // loading_g 안의 path 찾기
        const paths = loadingGroup.querySelectorAll('path[stroke]');
        if (paths.length === 0) {
            console.warn('SVG path를 찾을 수 없습니다.');
            return 0;
        }
        
        // clipPath의 path들을 찾아서 순차적으로 나타나게 함
        const clipPath = svgElement.querySelector('clipPath');
        if (clipPath && paths.length > 0) {
            const clipPaths = clipPath.querySelectorAll('path.cls-10');
            if (clipPaths.length > 0) {
                // clipPath의 각 path를 순차적으로 활성화하여 텍스트 부분별로 나타나게 함
                const mainPath = paths[0];
                const pathLength = mainPath.getTotalLength();
                
                // clipPath의 각 path에 해당하는 부분을 순차적으로 나타나게 함
                clipPaths.forEach((clipPathItem, index) => {
                    const delay = index * 0.4; // 각 부분 간 0.4초 딜레이
                    
                    // clipPath를 사용하여 부분별로 나타나게 함
                    setTimeout(() => {
                        // clipPath의 path를 순차적으로 활성화
                        const clipPathId = clipPath.getAttribute('id');
                        mainPath.style.clipPath = `url(#${clipPathId})`;
                        mainPath.style.opacity = '1';
                    }, delay * 1000);
                });
            }
        }
        
        return animatePaths(paths);
    }
    
    /**
     * Path들에 애니메이션 적용
     */
    function animatePaths(paths) {
        let totalDelay = 0;

        paths.forEach((path, index) => {
            const pathLength = path.getTotalLength();
            
            if (pathLength === 0) {
                console.warn(`Path ${index}의 길이가 0입니다.`);
                return;
            }
            
            // stroke-dasharray와 stroke-dashoffset 설정
            path.style.strokeDasharray = pathLength;
            path.style.strokeDashoffset = pathLength;
            path.style.strokeLinecap = 'round';
            path.style.strokeLinejoin = 'round';
            
            // clipPath를 사용하여 부분별로 순차적으로 나타나게 함
            const svgElement = path.closest('svg');
            const clipPath = svgElement ? svgElement.querySelector('clipPath') : null;
            
            if (clipPath && index === 0) {
                // 첫 번째 path에만 clipPath를 적용하여 부분별로 나타나게 함
                const clipPaths = clipPath.querySelectorAll('path.cls-10');
                if (clipPaths.length > 0) {
                    // clipPath의 각 path에 해당하는 부분을 순차적으로 나타나게 함
                    // '결혼식에 초대'부터 '합니다'까지 순차적으로 나타나게 함
                    clipPaths.forEach((clipPathItem, clipIndex) => {
                        const clipDelay = clipIndex * 400; // 각 부분 간 0.4초 딜레이
                        
                        setTimeout(() => {
                            // clipPath를 사용하여 부분별로 나타나게 함
                            const clipPathId = clipPath.getAttribute('id');
                            // clipPath의 각 path를 순차적으로 활성화
                            if (clipIndex === 0) {
                                // 첫 번째 부분부터 시작
                                path.style.clipPath = `url(#${clipPathId})`;
                            }
                            // 각 부분이 나타날 때마다 clipPath 업데이트
                            path.style.opacity = '1';
                        }, clipDelay);
                    });
                }
            }
            
            // 각 path에 순차적으로 애니메이션 적용
            path.style.animation = `intro-svg-draw ${DRAW_DURATION}ms ease-out ${totalDelay}ms forwards`;
            
            totalDelay += PATH_DELAY;
        });

        return totalDelay + DRAW_DURATION; // 전체 애니메이션 완료 시간
    }

    /**
     * SVG 파일을 로드하고 인라인으로 삽입
     */
    async function loadAndSetupSVG() {
        const container = document.getElementById('introSvgContainer');
        if (!container) return;

        try {
            // SVG 파일을 fetch로 로드
            const response = await fetch('./images/intro.svg');
            const svgText = await response.text();
            
            // SVG 텍스트를 DOM으로 변환
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
            const svgElement = svgDoc.querySelector('svg');
            
            if (!svgElement) {
                console.error('SVG 요소를 찾을 수 없습니다.');
                return;
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
                console.log('SVG Stroke Drawing 애니메이션 설정 완료');
            }, 100);
            
        } catch (error) {
            console.error('SVG 로드 실패:', error);
            // 실패 시 이미지 태그로 폴백
            container.innerHTML = '<img src="./images/intro.svg" alt="결혼식에 초대합니다" class="intro-svg svg_handwritng">';
        }
    }

    // DOM 로드 완료 후 실행
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadAndSetupSVG);
    } else {
        loadAndSetupSVG();
    }
})();
