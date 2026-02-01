//01 JS SCROLLMAGIC 애니메이션
spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl){   
        console.log("spyEl",spyEl);
        // 스크롤매직이벤트처리 객체
        new ScrollMagic.Scene({
                triggerElement : spyEl, //감시할 요소 선택
                triggerHook : 0.8       //스크린에서의 스크롤 위치
            })
        .setClassToggle(spyEl,'to-up')
        .addTo(new ScrollMagic.Controller());   
})





