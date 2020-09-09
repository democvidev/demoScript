const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

const nextChristmas = '25 Dec 2020';

function countDown(){
    const ChristmasDate = new Date(nextChristmas);
    const currentDate = new Date();

    const totalSeconds = Math.floor((ChristmasDate - currentDate) / 1000);

    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;

    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minutesEl.innerHTML = formatTime(minutes);
    secondsEl.innerHTML = formatTime(seconds);


    // console.log(days, hours, minutes, seconds);
    // console.log((ChristmasDate - currentDate)); milisecondes
}

function formatTime(time) {
    return time < 10 ? (`0${time}`) : time;
}

//initial call
countDown();

//appele de la fonction à chaque seconde
setInterval(countDown, 1000);
