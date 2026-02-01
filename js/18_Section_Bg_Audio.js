// howler.js(오디오 자동재생 - live-server로 확인)
const bgSound = new Howl({
  src: ['./audio/wedding.mp3'],
  volume: 3.0,
  loop: true
});
bgSound.play();

// 아이콘 클릭시 배경음악 재생여부
const volumnChkEl = document.querySelector('#volumn-chk');
function updateNavSpeaker() {
    var navSpeaker = document.querySelector('.mobile-nav-bar__item--speaker');
    if (navSpeaker) {
        navSpeaker.classList.toggle('is-muted', !volumnChkEl.checked);
    }
}
if (volumnChkEl) {
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




