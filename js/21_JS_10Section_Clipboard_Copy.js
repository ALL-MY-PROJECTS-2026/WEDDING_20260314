


const accordionAEls = document.querySelectorAll(".accordion .right a");


accordionAEls.forEach(item=>{

    item.addEventListener('click',function(){
        console.log(item);
        const leftBlockEl =  item.parentNode.parentNode;
        const accountNumber =  item.parentNode.parentNode.querySelector('.account-number').innerHTML;
        console.log(accountNumber);
        //클립보드에 복사
         window.navigator.clipboard.writeText(accountNumber) ;


    })
})


