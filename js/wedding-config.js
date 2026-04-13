/**
 * 모바일 청첩장 템플릿 — 배포 전 이 파일만 수정하면 됩니다.
 *
 * [카카오]
 * - https://developers.kakao.com 에서 앱을 만든 뒤, 플랫폼에 사이트 도메인을 등록하세요.
 * - kakaoJavascriptKey: 앱 키 > JavaScript 키 (카카오톡 공유 SDK, 카카오맵 Web API URL에 동일 사용)
 *
 * [Open Graph]
 * - ogImageAbsoluteUrl: SNS 미리보기용 절대 URL(배포 후 권장). 비우면 ogImagePath를 현재 주소 기준으로 절대 경로로 만듭니다.
 * - canonicalSiteUrl: og:url. 비우면 스크립트가 현재 페이지 URL(해시 제외)을 사용합니다.
 */
(function (global) {
  var T = {
    siteName: '모바일 청첩장',
    pageTitle: '신랑 ❤ 신부 결혼합니다.',
    /** SNS 미리보기 설명 한 줄 */
    ogDescription:
      'YYYY년 M월 D일(요일) 오후 H시 M분 · 예식장명 (템플릿 — wedding-config.js에서 수정하세요)',

    /** 비우면 ogImagePath로부터 절대 URL 생성 */
    ogImageAbsoluteUrl: '',
    ogImagePath: './images/01_section.jpg',

    /**
     * 공식 사이트 URL (끝에 슬래시 있어도 무방). SNS·북마크용.
     * 비우면 브라우저가 현재 문서 URL을 사용합니다.
     */
    canonicalSiteUrl: '',

    /** 예식일 (ISO 8601 날짜만, 시각은 weddingTimeLabel 참고) */
    weddingDateISO: '2026-06-06',
    /** 달력·본문에 그대로 표시되는 시간 문구 */
    weddingTimeLabel: '오후 12시 00분',

    venueName: '예식장명',
    venueHall: 'N층 홀명',
    /** 네이버/카카오 지도 앱 검색에 쓰는 키워드 */
    venueSearchQuery: '예식장 검색어',

    addressRoad: '시·도 시·군·구 도로명 주소 (상세 주소)',

    /** Leaflet 지도 마커 (WGS84, 네이버·카카오 지도에서 복사) */
    mapLat: 37.5665,
    mapLng: 126.978,

    groomName: '신랑',
    brideName: '신부',

    groomParent1: '신랑 아버지',
    groomParent2: '신랑 어머니',
    brideParent1: '신부 아버지',
    brideParent2: '신부 어머니',

    /** section-04 하단 문장: "OO의 결혼식이 [숫자]일 남았습니다" 앞부분 */
    ddaySentencePrefix: '신랑 ❤ 신부',

    /** 지하철 안내 (HTML 허용, 예: 굵게 표시할 역명은 <span> 사용) */
    subwayGuideHtml: '[노선명] <span>역명</span> N번 출구 도보 N분',

    /** 버스 안내 (문자열 배열, 순서대로 출력) */
    busLines: [
      '주요 정류장 하차 안내 문구를 입력하세요.',
      '간선 · 지선 · 직행 버스 번호 예시',
      '일반 · 마을 버스 번호 예시',
    ],

    /** 주차 안내 (문자열 배열) */
    parkingLines: [
      '본관 주차 안내 (층수·무료 시간 등)',
      '외부 주차 안내',
      '행사 당일 혼잡 시 대중교통 이용을 권장합니다.',
      '-',
      '역·거리 등 참고 문구 (없으면 빈 칸으로 두고 배열에서 제거)',
      '먼 길 와주셔서 감사드립니다.',
    ],

    /**
     * 계좌 (표시 순서 고정)
     * groomSide: 신랑측 아코디언 첫 블록
     * brideSide: 신부측 — 복수 계좌 가능
     */
    accounts: {
      groomSide: [{ bank: '은행명', number: '000-000-000000', holder: '신랑' }],
      brideSide: [
        { bank: '은행명', number: '000-000-000000', holder: '신부' },
        { bank: '은행명', number: '000-000-000000', holder: '예금주' },
      ],
    },

    /** 카카오 JavaScript 키 — 플레이스홀더를 실제 키로 바꾸면 공유·지도 SDK가 동작합니다. */
    kakaoJavascriptKey: 'YOUR_KAKAO_JAVASCRIPT_KEY',

    /** 카카오 공유 카드 제목 */
    kakaoShareTitle: '신랑 ❤ 신부 결혼합니다',

    /**
     * 카카오 공유 썸네일 — 비우면 ogImageAbsoluteUrl 또는 ogImagePath 기준 URL 사용
     */
    kakaoShareImageUrl: '',

    copyrightHolder: 'YOUR_SITE_OR_NAME',
    copyrightYear: '2026',
  };

  global.WEDDING_TEMPLATE = T;

  function absUrl(path) {
    try {
      return new URL(path, document.baseURI).href;
    } catch (e) {
      return path;
    }
  }

  function setMeta(sel, val) {
    if (val === undefined || val === null || val === '') return;
    var m = document.querySelector(sel);
    if (m) m.setAttribute('content', val);
  }

  /** head 안의 메타·title 동기화 (config 로드 직후·DOM에 meta 존재 시 실행) */
  function applyMetaFromTemplate() {
    if (!document.documentElement || document.querySelectorAll('meta').length === 0) return;
    var c = global.WEDDING_TEMPLATE;
    if (!c) return;

    setMeta('meta[property="og:site_name"]', c.siteName);
    setMeta('meta[property="og:title"]', c.pageTitle);
    setMeta('meta[property="og:description"]', c.ogDescription);

    var ogImg =
      (c.ogImageAbsoluteUrl && String(c.ogImageAbsoluteUrl).trim()) || absUrl(c.ogImagePath || './images/01_section.jpg');
    setMeta('meta[property="og:image"]', ogImg);

    var ou = (c.canonicalSiteUrl && String(c.canonicalSiteUrl).trim()) || '';
    if (!ou && typeof location !== 'undefined') {
      ou = location.href.split('#')[0];
    }
    setMeta('meta[property="og:url"]', ou);

    var t = document.querySelector('title');
    if (t && c.pageTitle) t.textContent = c.pageTitle;
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', applyMetaFromTemplate);
    } else {
      applyMetaFromTemplate();
    }
  }
})(typeof window !== 'undefined' ? window : this);
