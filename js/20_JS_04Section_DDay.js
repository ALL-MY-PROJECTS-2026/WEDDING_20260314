const wedding_date = new Date("2024-03-20");
const wedding_hours = "오후 02시 30분";

// CALENDAR FUNCTION 
const cal_calender = (wedding_date,time)=>{
   
    var d_day = wedding_date.getDate();
    var yoil = wedding_date.getDay();
    var calendarYear = wedding_date.getFullYear();          // 달력 연도
    var calendarMonth = wedding_date.getMonth() + 1;        // 달력 월 
    var calendarToday = wedding_date.getDate();             // 달력 일
    
    //마지막 일자 구하기
    var monthLastDate = new Date(2022, calendarMonth-1, 0).getDate();
    //날짜를 기준으로 월의 시작 요일 구하기
    var monthStartDay = new Date(calendarYear, calendarMonth-1, 1);
    
    var calendarMonthStartDay = monthStartDay.getDay(); // 달력 월의 시작 요일
    console.log("YEAR : ",calendarYear);
    console.log("MONTH : ",calendarMonth);
    console.log("LAST DAY : ",monthLastDate);
    console.log("D-DAY : ",d_day);
    console.log("START YOIL : ",monthStartDay);
    console.log("START YOIL : ",calendarMonthStartDay); //월요일기준으로 1 - 6(토) ,0(일)


    //01SECTION 헤더 YYYY/MM/DD 랜더링
    const Section01topDateEl = document.querySelector('.wrapper nav>div:nth-child(1)')
    Section01topDateEl.innerHTML = calendarYear+" <span style=font-size:1.5rem>/</span> ";
    if(calendarMonth<10)
    Section01topDateEl.innerHTML += "0"+calendarMonth+" <span style=font-size:1.5rem>/</span> ";
    else
    Section01topDateEl.innerHTML += calendarMonth+" <span style=font-size:1.5rem>/</span> ";

    if(d_day<10)
    Section01topDateEl.innerHTML += "0"+d_day;
    else
    Section01topDateEl.innerHTML += d_day;   


    ///01SECTION 헤더 요일 랜더링
    const yoilEl = document.querySelector('.wrapper nav>div:nth-child(2)')
    if(yoil==0)
        yoilEl.innerHTML = 'SUNDAY';
    else if(yoil==1)
        yoilEl.innerHTML = 'MONDAY';
    else if(yoil==2)
        yoilEl.innerHTML = 'TUESDAY';
    else if(yoil==3)
        yoilEl.innerHTML = 'WEDNESDAY';
    else if(yoil==4)
        yoilEl.innerHTML = 'THURSDAY';
    else if(yoil==5)
        yoilEl.innerHTML = 'FRIDAY';
    else if(yoil==6)
        yoilEl.innerHTML = 'SATURDAY';

    ///01SECTION DATETIME에 연월일 요일 랜더링
    const section01DatetimeEl = document.querySelector('.wrapper>main>section:nth-child(1) .datetime');
    section01DatetimeEl.innerHTML = calendarYear+" 년 ";
    if(calendarMonth<10)
    section01DatetimeEl.innerHTML += "0"+calendarMonth+" 월 ";
    else
    section01DatetimeEl.innerHTML += calendarMonth+" 월 ";

    if(d_day<10)
    section01DatetimeEl.innerHTML += "0"+d_day+" 일 ";
    else
    section01DatetimeEl.innerHTML += d_day +" 일 ";   

    const section01HoursEl = document.querySelector('.wrapper>main>section:nth-child(1) .bottom .hours');
    section01HoursEl.innerHTML= time;


    //화면에 달력 랜더링


    //-------------------
    // TOP-DATE
    //-------------------
    const topDateEl = document.querySelector('.wrapper>main>section:nth-child(4) .top-date')
    topDateEl.innerHTML = calendarYear+".";
    if(calendarMonth<10)
        topDateEl.innerHTML += "0"+calendarMonth+".";
    else
        topDateEl.innerHTML += calendarMonth+".";

    if(d_day<10)
        topDateEl.innerHTML += "0"+d_day;
    else
        topDateEl.innerHTML += d_day;

        

    //-------------------
    // TOP-HOURS
    //-------------------
    const topHoursEl = document.querySelector('.wrapper>main>section:nth-child(4) .top-hours')
    if(yoil==0)
        topHoursEl.innerHTML = '일요일 ' +time;
    else if(yoil==1)
        topHoursEl.innerHTML = '월요일 ' +time;
    else if(yoil==2)
        topHoursEl.innerHTML = '화요일 ' +time;
    else if(yoil==3)
        topHoursEl.innerHTML = '수요일 ' +time;
    else if(yoil==4)
        topHoursEl.innerHTML = '목요일 ' +time;
    else if(yoil==5)
        topHoursEl.innerHTML = '금요일 ' +time;
    else if(yoil==6)
        topHoursEl.innerHTML = '토요일 ' +time;
    
    //-------------------
    // TABLE BODY 
    //-------------------
    let day=1;
    //FirstRow
    const tdStartEls =  document.querySelectorAll(".wrapper>main>section:nth-child(4) table td.start-days");
    tdStartEls.forEach(tdEl=>{    
       const start_no =  tdEl.getAttribute('data-start');
        if(start_no>=calendarMonthStartDay)
            tdEl.innerHTML=(day++);
    })
    //EtcRow
    const tdEtcEls =  document.querySelectorAll(".wrapper>main>section:nth-child(4) table td.days");
    tdEtcEls.forEach(tdEl=>{    
      
        if(day<=monthLastDate)
            tdEl.innerHTML=day;
    
        day++;
    })   
    // D-DAY 표시(classname : d-day)
    const tdEls =  document.querySelectorAll(".wrapper>main>section:nth-child(4) table td");
    tdEls.forEach(tdEl=>{
        if(tdEl.innerHTML==d_day)
        tdEl.classList.add('d-day');
    })
    
    
    
    
}



cal_calender(wedding_date, wedding_hours);



// D DAY FUNCTION
const dayEls = document.querySelectorAll('.wrapper>main>section:nth-child(4) .bottom .day>span');
const hoursEl = document.querySelector('.wrapper>main>section:nth-child(4) .bottom .hours>span');
const minEl = document.querySelector('.wrapper>main>section:nth-child(4) .bottom .min>span');
const secEl = document.querySelector('.wrapper>main>section:nth-child(4) .bottom .sec>span');

const d_day_func = (weddingDate)=>{

    const todayTime = new Date();
    
    const diff = weddingDate - todayTime;

    let diffDay = Math.floor(diff / (1000*60*60*24));
    let diffHour = Math.floor((diff / (1000*60*60)) % 24);
    let diffMin = Math.floor((diff / (1000*60)) % 60);
    let diffSec = Math.floor(diff / 1000 % 60);

    console.log("D-DAY표시 :",diffDay,diffHour,diffMin,diffSec);
    // D-DAY 랜더링 
    dayEls.forEach(dayEl=>{
        if(diffDay<10)
            dayEl.innerHTML = "0"+diffDay;
        else
            dayEl.innerHTML = diffDay;
    })


    if(diffHour<10)
        diffHour="0"+diffHour;
    hoursEl.innerHTML = diffHour;

    if(diffMin<10)
        diffMin="0"+diffMin;
    minEl.innerHTML = diffMin;
    if(diffSec<10)
        diffSec="0"+ diffSec;
    
        secEl.innerHTML = diffSec;


}

// DDAY 최초실행
d_day_func(wedding_date);

//D Day 반복 비동기
setInterval(function(){
    d_day_func(wedding_date);
},1000)

