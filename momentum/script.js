
const time = document.querySelector('.time'),
  time_date = document.querySelector('.time-date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');

const showAmPm = true;

const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
const months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

function showTime() {
  let today = new Date(),
    month = today.getMonth(),
    date = today.getDate(),
    day = today.getDay(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  if (sec === 0 && min === 0) {
    setBgGreet();
  }

  time.innerHTML = `${hour}:${addZero(min)}:${addZero(sec)}`;
  time_date.innerHTML = `${days[day]}, ${date} ${months[month]}`;

  setTimeout(showTime, 1000);
}

function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}


//---------------------------------------------------------------------
let images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];

for (let i = images.length - 1; i > 0; i--) {
  let j = Math.floor(Math.random() * (i + 1));
  [images[i], images[j]] = [images[j], images[i]];
}

let arrsrc = [];
for (let i = 0; i < 6; i++) {
  arrsrc.push("assets/images/night/" + images[i % 6])
}
for (let i = 0; i < 6; i++) {
  arrsrc.push("assets/images/morning/" + images[i % 6])
}
for (let i = 0; i < 6; i++) {
  arrsrc.push("assets/images/day/" + images[i % 6])
}
for (let i = 0; i < 6; i++) {
  arrsrc.push("assets/images/evening/" + images[i % 6])
}
//------------------------------------------------------------------------------------

let i = 1;
function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
  };
}
function getImage() {
  let today = new Date(),
    hour = today.getHours();
  let imageSrc = arrsrc[(hour + i) % 24];
  viewBgImage(imageSrc);
  i++;
  btn.disabled = true;
  setTimeout(function () { btn.disabled = false }, 1000);
}
const btn = document.querySelector('.btn');
btn.addEventListener('click', getImage);



const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');

let advices = [
  "If you are ever in doubt about whether or not to wash your hair: Wash it.",
  "When in doubt, just take the next small step.",
  "Try to do the things that you're incapable of.",
  "If you are ever in doubt about whether or not to wash your hair: Wash it.",
  "Happiness is a journey, not a destination.",
  "If you're going bald, don't comb your hair over your bald patch.",
  "It is easy to sit up and take notice, what's difficult is getting up and taking action.",
  "Never pay full price for a sofa at DFS.",
  "Do not compare yourself with others.",
  "Drink a glass of water before meals.",
  "Happiness is a journey, not a destination.",
  "As you get older, learn never to trust a fart.",
  "Sing in the shower.",
  "Don't feed Mogwais after midnight.",
  "Big things have small beginnings.",
  "It always seems impossible, until it's done.",
  "The best sex is fun.",
  "Hold the door open for the next person.",
  "Keep it simple.",
  "Don't waste food.",
  "When in doubt, just take the next small step.",
  "Work is never as important as you think it is.",
  "Don't take life too seriously.",
  "Enjoy a little nonsense now and then."
]
for (let i = advices.length - 1; i > 0; i--) {
  let j = Math.floor(Math.random() * (i + 1));
  [advices[i], advices[j]] = [advices[j], advices[i]];
}

let adv=0;
function getQuote() {
  blockquote.textContent = advices[adv % 24]
  adv++;
}
document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);

const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const windspeed = document.querySelector('.windspeed');
const humidity = document.querySelector('.humidity');




async function getWeather() {

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=1bfae991748a80b796a1b2e3890f3887&units=metric`;
  const res = await fetch(url);

  if (!res.ok) {
    localStorage.setItem('city', "Минск");
    getCity();
    return;
  }
  const data = await res.json();
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
  windspeed.textContent = "скорость ветра: " + data.wind.speed + " м/с";
  humidity.textContent = "влажность воздуха : " + data.main.humidity + " %";
}



function getCity() {
  if (localStorage.getItem('city') === null) {
    city.textContent = 'Минск';
  } else {
    city.textContent = localStorage.getItem('city');
  }
}

function setCity(e) {
  if (e.type === 'keypress') {
    if (e.keyCode == 13 || e.which == 13) {
      if (city.textContent === "") {
        getCity();
        return;
      }
      getWeather();
      localStorage.setItem('city', e.target.innerText);
      city.blur();
    }
  } else {
    if (city.textContent === "") {
      getCity();
      return;
    }
    getWeather();
    localStorage.setItem('city', e.target.innerText);
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);





//---------------------------------------------------------------------------------------
// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();
  if (hour >= 6 && hour < 12) {
    document.body.style.backgroundImage =
      `url(assets/images/morning/${images[hour % 6]})`;
    greeting.textContent = 'Доброе утро, ';
  } else if (hour >= 12 && hour < 18) {
    document.body.style.backgroundImage =
      `url(assets/images/day/${images[hour % 6]})`;
    greeting.textContent = 'Добрый день, ';
  } else if (hour >= 18 && hour < 24) {
    document.body.style.backgroundImage =
      `url(assets/images/evening/${images[hour % 6]})`;
    greeting.textContent = 'Добрый вечер, ';
    document.body.style.color = 'white';
  } else {
    document.body.style.backgroundImage =
      `url(assets/images/night/${images[hour % 6]})`;
    greeting.textContent = 'Доброй ночи, ';
    document.body.style.color = 'white';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

let prev;
for (let elem of document.querySelectorAll('.name, .focus')) {
  elem.onclick = (e) => {
    prev = elem.textContent;
    elem.textContent = "";
    elem.focus();


  }
}

for (let elem of document.querySelectorAll('.name, .focus')) {
  elem.onblur = (e) => {
    if (elem.textContent === "") {
      elem.textContent = prev;
    }
  }
}


// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
setBgGreet();
getName();
getFocus();
getCity();