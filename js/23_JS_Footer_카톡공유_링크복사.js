// 카톡공유(https://developers.kakao.com/docs/latest/ko/message/js-link#default-template-msg-custom)

  // SDK를 초기화 합니다. 사용할 앱의 JavaScript 키를 설정해 주세요.
  Kakao.init('4c98b24b02bfbd026cbe7fe5300f9e1d');

  // SDK 초기화 여부를 판단합니다.
  console.log(Kakao.isInitialized());


const kakaoShare =  document.querySelector('.kakao-share');
kakaoShare.addEventListener('click',function(){

    // Kakao.Share.sendDefault({
    //     objectType: 'text',
    //     text:'최도형 ❤️ 이하나 결혼합니다',
    //     imageUrl:'http://k.kakaocdn.net/dn/dScJiJ/btqB3cwK1Hi/pv5qHVwetz5RZfPZR3C5K1/kakaolink40_original.png',
    //     link: {
    //       mobileWebUrl: window.location.href,
    //       webUrl: window.location.href,
    //     },
    //   });

    console.log("window.location.origin",window.location.origin);
 
    // 직접 버튼 사용하는 메시지 탬플릿(위치)
    Kakao.Share.sendDefault({
        objectType: 'location',
        address: '주소가 들어가는 부분',
        addressTitle: '주소 제목',
        content: {
          title: '도형 ❤️ 하나 결혼합니다',
          description: '',
          imageUrl: "https://edu-embadded-curriculum.github.io/02_SCREEN_IMPL_WEDDING.github.io/images/01_section.jpg",
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

})



//   function kakaoShare() {
//     Kakao.Link.sendDefault({
//       objectType: 'feed',
//       content: {
//         title: '카카오공유하기 시 타이틀',
//         description: '카카오공유하기 시 설명',
//         imageUrl: '카카오공유하기 시 썸네일 이미지 경로',
//         link: {
//           mobileWebUrl: '카카오공유하기 시 클릭 후 이동 경로',
//           webUrl: '카카오공유하기 시 클릭 후 이동 경로',
//         },
//       },
//       buttons: [
//         {
//           title: '웹으로 보기',
//           link: {
//             mobileWebUrl: '카카오공유하기 시 클릭 후 이동 경로',
//             webUrl: '카카오공유하기 시 클릭 후 이동 경로',
//           },
//         },
//       ],
//       // 카카오톡 미설치 시 카카오톡 설치 경로이동
//       installTalk: true,
//     })
//   }






// 링크공유
const urlCopy = document.querySelector('.url-copy');
urlCopy.addEventListener('click',function(){
        //클립보드에 복사
         window.navigator.clipboard.writeText(window.location.href) ;
})

