const timeContainer = document.querySelector(".time_container"),
  currentTime = timeContainer.querySelector(".time"),
  currentDate = timeContainer.querySelector(".date");

function getDay() {
  const date = new Date();
  const whatDay = date.getDay();
  const daysOfWeek = [
    "Sun",
    "Mon",
    "Tues",
    "Wednes",
    "Thurs",
    "Fri",
    "Satur",
    "Sun",
  ];
  const today = `${daysOfWeek[whatDay]}day`;
  const day = date.getDate();
  const month = date.getMonth();
  const whatMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const thisMonth = whatMonth[month];
  const year = date.getFullYear();
  currentDate.innerHTML = `${today} ${day} ${thisMonth} ${year}`;
};

function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  currentTime.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
};


function init() {
  getTime();
  getDay();
  setInterval(getTime, 1000);
};

init();
