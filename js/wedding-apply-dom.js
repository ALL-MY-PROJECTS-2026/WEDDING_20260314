/**
 * wedding-config.js의 값을 본문 DOM에 반영합니다.
 * main.html 본문이 모두 파싱된 뒤, 다른 인라인 스크립트보다 먼저 동기 로드하세요.
 */
(function () {
  function run() {
    var T = window.WEDDING_TEMPLATE;
    if (!T) return;

    function esc(s) {
      if (s == null) return '';
      return String(s)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    var hero = document.querySelector('.main_image_couple_name');
    if (hero) {
      var bees = hero.querySelectorAll('.couple-name-bee');
      var beeHtml = '';
      for (var bi = 0; bi < bees.length; bi++) beeHtml += bees[bi].outerHTML;
      hero.innerHTML =
        esc(T.groomName) +
        ' <span class="heart">❤</span> ' +
        esc(T.brideName) +
        '\n            <!-- 커플 이름 영역 안에서 날아다니는 벌 2개 -->\n            ' +
        beeHtml;
    }

    var locs = document.querySelectorAll('#section-01-1 .info-location');
    if (locs[0]) locs[0].textContent = T.venueName;
    if (locs[1]) locs[1].textContent = T.venueHall;

    var infoDate = document.querySelector('#section-01-1 .info-date');
    if (infoDate && T.weddingDateISO && T.weddingTimeLabel) {
      var d = new Date(T.weddingDateISO + 'T12:00:00');
      var w = ['일', '월', '화', '수', '목', '금', '토'];
      var y = d.getFullYear();
      var mo = d.getMonth() + 1;
      var day = d.getDate();
      infoDate.textContent =
        y +
        '년 ' +
        mo +
        '월 ' +
        day +
        '일 ' +
        w[d.getDay()] +
        '요일 ' +
        T.weddingTimeLabel;
    }

    var s02 = document.querySelector('#section-03 .sentence-02');
    if (s02) {
      var flower = '<img src="images/flower_chrysanthemum.jpg" style="width:15px;">';
      s02.innerHTML =
        '<div><span style="position:relative"> ' +
        esc(T.groomParent1) +
        flower +
        ' · ' +
        esc(T.groomParent2) +
        '</span> 의 아들 <span> ' +
        esc(T.groomName) +
        '</span></div>' +
        '<div><span style="position:relative"> ' +
        esc(T.brideParent1) +
        flower +
        ' · ' +
        esc(T.brideParent2) +
        '</span> 의 딸 <span> ' +
        esc(T.brideName) +
        '</span></div>';
    }

    var ddayLine = document.querySelector('#section-04 .bottom-body .day');
    if (ddayLine) {
      ddayLine.innerHTML =
        esc(T.ddaySentencePrefix) +
        '의 결혼식이 <span style="color:red;"></span>일 남았습니다.';
    }

    var locTitle = document.querySelector('#section-06 .location');
    if (locTitle) locTitle.textContent = T.venueName;
    var addrEl = document.querySelector('#section-06 .address');
    if (addrEl) addrEl.textContent = T.addressRoad;

    var q = encodeURIComponent(T.venueSearchQuery || T.venueName);
    var naverLink = document.querySelector('#section-06 .map-nav .naver a');
    if (naverLink) naverLink.href = 'https://map.naver.com/v5/search/' + q;
    var kakaoLink = document.querySelector('#section-06 .map-nav .kakao a');
    if (kakaoLink) kakaoLink.href = 'https://map.kakao.com/link/search/' + q;

    var subwayContents = document.querySelector('#section-06 .subway .right .contents');
    if (subwayContents) subwayContents.innerHTML = T.subwayGuideHtml;

    var busWrap = document.querySelector('#section-06 .bus .right');
    if (busWrap && T.busLines && T.busLines.length) {
      var titleEl = busWrap.querySelector('.title');
      var html = '';
      if (titleEl) html += titleEl.outerHTML;
      T.busLines.forEach(function (line) {
        html += '<div class="contents">' + esc(line) + '</div>';
      });
      busWrap.innerHTML = html;
    }

    var parkingRight = document.querySelector('#section-07 .parking-item .right');
    if (parkingRight && T.parkingLines && T.parkingLines.length) {
      var pl = T.parkingLines;
      var phtml = '';
      pl.forEach(function (line, i) {
        if (line === '-') {
          phtml += '<div>-</div>';
          return;
        }
        var lastTwo = i >= pl.length - 2;
        phtml += lastTwo
          ? '<div class="contents">' + esc(line) + '</div>'
          : '<div>' + esc(line) + '</div>';
      });
      parkingRight.innerHTML = phtml;
    }

    var acc = T.accounts;
    if (acc && acc.groomSide && acc.groomSide[0]) {
      var g = acc.groomSide[0];
      var gAcc = document.querySelector('#collapseOne .accordion-body .account');
      if (gAcc) {
        var gb = gAcc.querySelector('.left span:first-child');
        var gn = gAcc.querySelector('.account-number');
        if (gb) gb.textContent = g.bank;
        if (gn) gn.textContent = g.number;
      }
      var gh = document.querySelector('#collapseOne .accordion-body > div > .name');
      if (gh) gh.textContent = g.holder;
    }
    if (acc && acc.brideSide && acc.brideSide.length) {
      var bodies = document.querySelectorAll('#collapseTwo .accordion-body > div');
      acc.brideSide.forEach(function (row, i) {
        if (!bodies[i]) return;
        var bank = bodies[i].querySelector('.account .left span:first-child');
        var num = bodies[i].querySelector('.account-number');
        var name = bodies[i].querySelector('.name');
        if (bank) bank.textContent = row.bank;
        if (num) num.textContent = row.number;
        if (name) name.textContent = row.holder;
      });
    }

    var cr = document.querySelector('footer .bottom span');
    if (cr && T.copyrightHolder) {
      cr.innerHTML =
        'Copyright ' +
        esc(T.copyrightYear) +
        ' <span>' +
        esc(T.copyrightHolder) +
        '</span> All right reserved.';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
