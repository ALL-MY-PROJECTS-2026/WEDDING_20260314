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
        const lastIndex = paths.length - 1;

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
            
            // 마지막 path (마침표 부분)에 튀어나오는 효과 추가
            if (index === lastIndex) {
                // 마지막 path는 stroke drawing 애니메이션 후 튀어나오는 효과
                const dotDelay = totalDelay + DRAW_DURATION;
                path.style.animation = `intro-svg-draw ${DRAW_DURATION}ms ease-out ${totalDelay}ms forwards`;
                
                // stroke drawing 완료 후 튀어나오는 효과
                setTimeout(() => {
                    path.style.animation = `intro-svg-draw ${DRAW_DURATION}ms ease-out ${totalDelay}ms forwards, intro-dot-pop 0.8s ease-out 0s forwards`;
                    path.style.opacity = '1';
                    path.style.transformOrigin = 'center';
                }, dotDelay);
            } else {
                // 각 path에 순차적으로 애니메이션 적용
                path.style.animation = `intro-svg-draw ${DRAW_DURATION}ms ease-out ${totalDelay}ms forwards`;
            }
            
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

    // DOM 로드 완료 후 실행
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadAndSetupSVG);
    } else {
        loadAndSetupSVG();
    }
})();
