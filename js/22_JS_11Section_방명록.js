




const board_btn =  document.querySelector('.board_btn');
board_btn.addEventListener('click',()=>{

    console.log("!!!!!");

    const innerFrame =  document.querySelector('.utterances-frame');
    var iframeDocument = innerFrame.contentWindow.document;


    console.log("iframeDocument",iframeDocument);

})



