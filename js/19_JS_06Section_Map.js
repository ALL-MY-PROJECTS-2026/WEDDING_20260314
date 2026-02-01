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
    if (typeof kakao === 'undefined' || !kakao.maps) {
        setTimeout(initMap, 100);
        return;
    }
    var map = createMap("경기도 안양시 만안구 안양로 104", "웨딩그룹위더스 안양");
    if (!map) return;

    // 지도 섹션 스크롤 시 relayout (표시 안됨 해결)
    var mapSection = document.querySelector('.wrapper>main>section.usemap');
    if (mapSection && typeof IntersectionObserver !== 'undefined') {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    map.relayout();
                }
            });
        }, { threshold: 0.1 });
        observer.observe(mapSection);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
} else {
    initMap();
}
