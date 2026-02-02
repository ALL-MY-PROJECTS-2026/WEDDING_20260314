// howler.js(오디오 자동재생 - live-server로 확인)
// file:// 프로토콜에서는 Howl 객체 생성 자체를 하지 않음 (CORS 오류 방지)
let bgSound = null;

if (window.location.protocol !== 'file:') {
  bgSound = new Howl({
    src: ['./audio/wedding.mp3'],
    volume: 0.3, // 0-1 범위로 수정 (3.0 → 0.3)
    loop: true,
    onloaderror: function(id, error) {
      // 오디오 로드 실패 시 조용히 처리 (CORS 문제 등)
    },
    onplayerror: function(id, error) {
      // 오디오 재생 실패 시 조용히 처리
      if (bgSound) {
        bgSound.once('unlock', function() {
          bgSound.play();
        });
      }
    }
  });
  
  // 자동 재생 시도
  bgSound.play();
}

// 아이콘 클릭시 배경음악 재생여부
const volumnChkEl = document.querySelector('#volumn-chk');
function updateNavSpeaker() {
    var navSpeaker = document.querySelector('.mobile-nav-bar__item--speaker');
    if (navSpeaker) {
        navSpeaker.classList.toggle('is-muted', !volumnChkEl.checked);
    }
}
if (volumnChkEl && bgSound) {
    volumnChkEl.addEventListener("change", function(e){
        if(volumnChkEl.checked){
            bgSound.play(); 
        } else {
            bgSound.stop(); 
        }
        updateNavSpeaker();
    });
    updateNavSpeaker();
}




