import * as lib from "./library.js";

let nowTimer = 0;
let startTimer = 0;
let startTime;
let isPaused = false;
let isStarted = false;

const timerBackground = document.querySelector(".timer");
const timerValue = document.querySelector(".timer__time");
const nowClock = document.querySelector(".timer__time").textContent;

document
  .querySelector(".timer-buttons__start")
  .addEventListener("click", () => {
    if (!isStarted) {
      timerBackground.classList.add("red");
      if (!isPaused) {
        startTimer = new Date().getTime();
        startTime = setInterval(() => {
          calcTimer();
        }, 1000);
      } else {
        const copy = document.querySelector(".timer__time").textContent;

        const nowClockToTimestamp =
          Number(copy.substring(0, 2)) * 3600 +
          Number(copy.substring(5, 7)) * 60 +
          Number(copy.substring(10, 12));
        startTimer = new Date().getTime();
        startTime = setInterval(() => {
          calcTimerWhenPaused(nowClockToTimestamp);
        }, 1000);
        isPaused = false;
      }
      isStarted = true;
    }
  });

document.querySelector(".timer-buttons__stop").addEventListener("click", () => {
  clearInterval(startTime);
  timerBackground.classList.remove("red");
  timerValue.innerHTML = "00 : 00 : 00";
  isPaused = false;
  isStarted = false;
});

document
  .querySelector(".timer-buttons__pause")
  .addEventListener("click", () => {
    if (!isPaused) {
      timerBackground.classList.remove("red");
      const copy = document.querySelector(".timer__time").textContent;
      document.querySelector(".timer__time").innerHTML = copy;
      clearInterval(startTime);
      isPaused = true;
      isStarted = false;
    }
  });

const calcTimer = () => {
  nowTimer = new Date().getTime();
  const diff = nowTimer - startTimer;
  const diffToSec = Math.floor(diff / 1000);
  const hourPart = lib.padInt(Math.floor(diffToSec / 3600));
  const minPart = lib.padInt(Math.floor((diffToSec - hourPart * 3600) / 60));
  const secPart = lib.padInt(diffToSec - hourPart * 3600 - minPart * 60);
  timerValue.innerHTML = hourPart + " : " + minPart + " : " + secPart;
};

const calcTimerWhenPaused = (saved) => {
  nowTimer = new Date().getTime();
  const diff = nowTimer - startTimer;
  const diffToSec = Math.floor(diff / 1000) + saved;
  const hourPart = lib.padInt(Math.floor(diffToSec / 3600));
  const minPart = lib.padInt(Math.floor((diffToSec - hourPart * 3600) / 60));
  const secPart = lib.padInt(diffToSec - hourPart * 3600 - minPart * 60);
  timerValue.innerHTML = hourPart + " : " + minPart + " : " + secPart;
};
