const timerInputEl = document.querySelector(".timer__input");
const timerButtonEl = document.querySelector(".timer__start");
const timerDays = document.querySelector(".timer__days");
const timerHours = document.querySelector(".timer__hours");
const timerMins = document.querySelector(".timer__mins");
const timerSecs = document.querySelector(".timer__secs");


//Current date object

let d = new Date();
let dateObj = {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    date: d.getDate(),
    hour: d.getHours(),
    mins: d.getMinutes(),
    secs: d.getSeconds()
    };

//Add zero to single digits for correct format

for(let d in dateObj) {
    if(dateObj[d] < 10 && dateObj[d] >= 0) dateObj[d] = "0" + dateObj[d];
}

//Default value & min/current date

let valueString = `${dateObj.year}-${dateObj.month}-${dateObj.date + 1}T00:00:00`;
let minString = `${dateObj.year}-${dateObj.month}-${dateObj.date}T${dateObj.hour}:${dateObj.mins}:${dateObj.secs}`;
timerInputEl.setAttribute("min", minString);
timerInputEl.setAttribute("value", valueString);

// Obtain total time in milliseconds

let timeDifference = (startDate, endDate) => {

    let milliseconds = Math.floor(endDate - startDate),
        seconds = Math.floor(milliseconds/1000),
        minutes = Math.floor(seconds/60),
        hours = Math.floor(minutes/60),
        days = Math.floor(hours/24);

        hours = hours - (days * 24);
        minutes = minutes - (days * 24 * 60) - (hours * 60);
        seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

        let timeObj = {
            tDays: days,
            tHours: hours,
            tMins : minutes,
            tSecs : seconds,
            tMilli : milliseconds
        };

        //Add zero to single digit times

       for(let t in timeObj) {
           if(timeObj[t] < 10 && timeObj[t] >= 0) timeObj[t] = "0" + timeObj[t];
           else if(timeObj[t] < 0) timeObj[t] = "00";
           }
    
        return timeObj;
};


//Show in realtime

let timer = setInterval(timeContent, 1000);

function timeContent() {

    let startDate = new Date().getTime(),
          endDate = new Date(timerInputEl.value).getTime();

     let time = timeDifference(startDate,endDate);


     timerDays.textContent = time.tDays;
     timerHours.textContent = time.tHours;
     timerMins.textContent = time.tMins;
     timerSecs.textContent = time.tSecs;

     if(time.tMilli <= 0) {

        clearInterval(timer);

        timerDays.textContent = "00";
        timerHours.textContent = "00";
        timerMins.textContent = "00";
        timerSecs.textContent = "00";
     }

     //Rotate when time expires

     const timerBoxes = document.querySelectorAll(".box");

     for(let box of timerBoxes) {
         if(box.textContent == "00") box.classList.add("rotate");
         else box.classList.remove("rotate");
     }

}



//Restart timer button

timerButtonEl.addEventListener("click", ()=> {
    timer = setInterval(timeContent, 1000);
});











