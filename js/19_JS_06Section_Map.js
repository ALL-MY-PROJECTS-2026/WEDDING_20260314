const createMap = (address, markerTitle) => {
    var mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    var mapOption = {
        center: new kakao.maps.LatLng(37.3929, 126.9267), // 안양 중심좌표
        level: 3
    };

    var map = new kakao.maps.Map(mapContainer, mapOption);
    map.setDraggable(false);

    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            var marker = new kakao.maps.Marker({ map: map, position: coords });
            var infowindow = new kakao.maps.InfoWindow({
                content: '<div class="map-marker">' + markerTitle + '</div>'
            });
            infowindow.open(map, marker);
            map.setCenter(coords);
        }
    });

    return map;
};

// 카카오맵 SDK 로드 후 초기화 + 스크롤 시 relayout
function initMap() {
    // Kakao Maps SDK 로드 확인 (더 강화된 체크)
    if (typeof kakao === 'undefined' || typeof kakao.maps === 'undefined' || !kakao.maps.Map) {
        setTimeout(initMap, 100);
        return;
    }
    
    var mapContainer = document.getElementById('map');
    if (!mapContainer) {
        setTimeout(initMap, 100);
        return;
    }
    
    var mapSection = document.querySelector('.wrapper>main>section.usemap');
    if (!mapSection) {
        setTimeout(initMap, 100);
        return;
    }
    
    // 지도 초기화
    var map = createMap("경기도 안양시 만안구 안양로 104", "웨딩그룹위더스 안양");
    if (!map) {
        // 초기화 실패 시 재시도
        setTimeout(initMap, 200);
        return;
    }

    // relayout 함수
    var relayoutMap = function() {
        try {
            if (map && typeof map.relayout === 'function') {
                map.relayout();
            }
        } catch(e) {
            // relayout 실패 시 무시
        }
    };
    
    // 지도 초기화 직후 즉시 relayout (지도가 숨겨져 있을 때를 대비)
    setTimeout(relayoutMap, 100);
    setTimeout(relayoutMap, 300);
    setTimeout(relayoutMap, 500);
    
    // 지도 섹션이 보일 때 relayout (IntersectionObserver 사용)
    if (typeof IntersectionObserver !== 'undefined') {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    // 지도가 보이면 relayout (여러 번 호출)
                    setTimeout(relayoutMap, 50);
                    setTimeout(relayoutMap, 200);
                    setTimeout(relayoutMap, 400);
                }
            });
        }, { threshold: 0.1, rootMargin: '100px' });
        observer.observe(mapSection);
        
        // 이미 보이는 상태면 즉시 relayout
        var rect = mapSection.getBoundingClientRect();
        var mapParent = mapContainer.closest('.map');
        var parentStyle = window.getComputedStyle(mapParent);
        var isVisible = rect.top < window.innerHeight && rect.bottom > 0 && 
                       parseFloat(parentStyle.opacity) > 0 &&
                       parentStyle.display !== 'none';
        
        if (isVisible) {
            setTimeout(relayoutMap, 200);
            setTimeout(relayoutMap, 500);
        }
    } else {
        // IntersectionObserver 미지원 시 폴백
        setTimeout(relayoutMap, 500);
        setTimeout(relayoutMap, 1000);
    }
    
    // 윈도우 리사이즈 시 relayout
    var resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(relayoutMap, 100);
    });
}

// DOM 로드 완료 후 초기화 시도
function startMapInit() {
    // DOM이 준비되었는지 확인
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initMap, 100);
        });
    } else {
        // DOM이 이미 로드된 경우
        setTimeout(initMap, 100);
    }
}

// 스크립트 로드 시 즉시 시작
startMapInit();
