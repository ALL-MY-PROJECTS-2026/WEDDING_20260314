/**
 * 로딩 스피너 - 이미지, CSS, JS, 폰트만 로딩 완료 확인
 */
(function () {
    'use strict';

    const spinner = document.getElementById('loadingSpinner');
    if (!spinner) return;

    let imagesLoaded = false;
    let fontsLoaded = false;
    let scriptsLoaded = false;

    /**
     * 모든 이미지 로딩 완료 확인
     */
    function checkImagesLoaded() {
        const images = document.querySelectorAll('img');
        if (images.length === 0) {
            imagesLoaded = true;
            checkAllResourcesLoaded();
            return;
        }

        let loadedCount = 0;
        let errorCount = 0;
        const totalImages = images.length;

        images.forEach(function(img) {
            if (img.complete) {
                loadedCount++;
            } else {
                img.addEventListener('load', function() {
                    loadedCount++;
                    if (loadedCount + errorCount === totalImages) {
                        imagesLoaded = true;
                        checkAllResourcesLoaded();
                    }
                });
                img.addEventListener('error', function() {
                    errorCount++;
                    if (loadedCount + errorCount === totalImages) {
                        imagesLoaded = true;
                        checkAllResourcesLoaded();
                    }
                });
            }
        });

        if (loadedCount + errorCount === totalImages) {
            imagesLoaded = true;
            checkAllResourcesLoaded();
        }
    }

    /**
     * 모든 폰트 로딩 완료 확인
     */
    function checkFontsLoaded() {
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(function() {
                fontsLoaded = true;
                checkAllResourcesLoaded();
            }).catch(function() {
                // 폰트 로딩 실패 시에도 진행
                fontsLoaded = true;
                checkAllResourcesLoaded();
            });
        } else {
            // 폰트 API를 지원하지 않는 경우
            setTimeout(function() {
                fontsLoaded = true;
                checkAllResourcesLoaded();
            }, 1000);
        }
    }

    /**
     * 모든 스크립트 로딩 완료 확인
     */
    function checkScriptsLoaded() {
        // DOMContentLoaded와 window.load 이벤트로 스크립트 로딩 확인
        if (document.readyState === 'complete') {
            scriptsLoaded = true;
            checkAllResourcesLoaded();
        } else {
            window.addEventListener('load', function() {
                scriptsLoaded = true;
                checkAllResourcesLoaded();
            });
        }
    }

    /**
     * 모든 리소스 로딩 완료 확인
     */
    function checkAllResourcesLoaded() {
        if (imagesLoaded && fontsLoaded && scriptsLoaded) {
            // 약간의 딜레이 후 스피너 숨기기 (부드러운 전환)
            setTimeout(function() {
                spinner.classList.add('hidden');
                // 애니메이션 완료 후 DOM에서 제거
                setTimeout(function() {
                    if (spinner.parentNode) {
                        spinner.parentNode.removeChild(spinner);
                    }
                }, 500);
            }, 300);
        }
    }

    /**
     * 스피너 숨기기
     */
    function hideSpinner() {
        spinner.classList.add('hidden');
        setTimeout(function() {
            if (spinner.parentNode) {
                spinner.parentNode.removeChild(spinner);
            }
        }, 500);
    }

    /**
     * 초기화
     */
    function init() {
        // 3초 후 강제로 스피너 숨기기 (모든 체크 무시)
        setTimeout(function() {
            hideSpinner();
        }, 3000);
    }

    // DOM 로드 완료 후 초기화
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
