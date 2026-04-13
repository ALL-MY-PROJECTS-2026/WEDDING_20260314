// 카톡공유 — main.html 사용 시 인라인 스크립트가 우선합니다. 본 파일은 wedding-config.js를 선로드한 경우에 맞춥니다.

(function () {
  var T = typeof window !== 'undefined' ? window.WEDDING_TEMPLATE : null;

  function absUrl(path) {
    try {
      return new URL(path, document.baseURI).href;
    } catch (e) {
      return path;
    }
  }

  function shareImageUrl() {
    if (!T) return absUrl('./images/01_section.jpg');
    var u = (T.kakaoShareImageUrl && String(T.kakaoShareImageUrl).trim());
    if (u) return u;
    u = (T.ogImageAbsoluteUrl && String(T.ogImageAbsoluteUrl).trim());
    if (u) return u;
    return absUrl(T.ogImagePath || './images/01_section.jpg');
  }

  var key = T && T.kakaoJavascriptKey;
  var kakaoReady = false;
  if (key && String(key).indexOf('YOUR_') !== 0 && typeof Kakao !== 'undefined' && Kakao.init) {
    try {
      Kakao.init(key);
      kakaoReady = true;
    } catch (e) {}
  }

  var kakaoShareEls = document.querySelectorAll('.kakao-share');
  kakaoShareEls.forEach(function (kakaoShare) {
    if (!kakaoShare) return;
    kakaoShare.addEventListener('click', function () {
      if (!kakaoReady || typeof Kakao === 'undefined' || !Kakao.Share) {
        alert('카카오 JavaScript 키를 wedding-config.js에 설정해 주세요.');
        return;
      }
      Kakao.Share.sendDefault({
        objectType: 'location',
        address: (T && T.addressRoad) || '',
        addressTitle: (T && T.venueName) || '',
        content: {
          title: (T && T.kakaoShareTitle) || (T && T.pageTitle) || '',
          description: '',
          imageUrl: shareImageUrl(),
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '자세히 보기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    });
  });

  document.querySelectorAll('.url-copy').forEach(function (urlCopy) {
    urlCopy.addEventListener('click', function () {
      var currentUrl = window.location.href;
      var introUrl;
      if (currentUrl.indexOf('main.html') !== -1) {
        introUrl = currentUrl.replace(/main\.html.*$/, 'index.html');
      } else {
        var baseUrl = window.location.origin + window.location.pathname;
        var lastSlash = baseUrl.lastIndexOf('/');
        if (lastSlash !== -1) {
          introUrl = baseUrl.substring(0, lastSlash + 1) + 'index.html';
        } else {
          introUrl = baseUrl + '/index.html';
        }
      }
      window.navigator.clipboard.writeText(introUrl);
    });
  });
})();
