// howler.js(오디오 자동재생 - live-server로 확인)
const bgSound = new Howl({
  src: ['./audio/wedding.mp3'],
  volume: 3.0,
  loop: true,
  onend: function () {
    alert('We finished with the setup!');
  }
});
bgSound.play();

// 아이콘 클릭시 배경음악 재생여부
const volumnChkEl = document.querySelector('#volumn-chk');
volumnChkEl.addEventListener("change",function(e){
    if(volumnChkEl.checked){
        //audio  on
        console.log('video mute on');
        bgSound.play(); 
    }else{
        //audio off
        console.log('video mute off');
        bgSound.stop(); 
      
    }
})




