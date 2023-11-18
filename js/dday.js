import * as lib from "./library.js";

let ddays = localStorage.getItem("ddays") === null ? {} : JSON.parse(localStorage.getItem("ddays"));

const ddayInsertionScreen = document.querySelector(".add-dday");
const newDdayDate = document.querySelector(".add-dday-input__date");
const newDdaySubject = document.querySelector(".add-dday-input__name");

document.querySelector(".dday-add-button").addEventListener("click", () => {
  ddayInsertionScreen.classList.add("show");
});

document.querySelector(".add-dday__form").addEventListener("submit", () => {
  let ddays = localStorage.getItem("ddays") === null ? {} : JSON.parse(localStorage.getItem("ddays"));
  ddays[newDdaySubject.value] = newDdayDate.value;
  localStorage.setItem("ddays", JSON.stringify(ddays));
  ddayInsertionScreen.classList.remove("show");
  drawDday();
});

document.querySelector(".add-dday__reset-button").addEventListener("click", () => {
  ddayInsertionScreen.classList.remove("show");
});

const deleteCurrentDday = () => {
  const ddayList = document.querySelector(".dday-list");
  while (ddayList.children.length > 0) {
    ddayList.removeChild(ddayList.lastChild);
  }
};

const drawDday = () => {
  deleteCurrentDday();
  Object.entries(ddays).forEach(([key, value]) => {
    const targetDay = new Date(value.substring(0, 4), value.substring(5, 7) - 1, value.substring(8, 10));
    addNewDday(key, targetDay);
  });
};

const deleteDday = (element) => {
  const target = element.firstChild.firstChild.innerText;
  delete ddays[target];
  localStorage.setItem("ddays", JSON.stringify(ddays));
  drawDday();
};

const createDdayElement = () => {
  const main = document.querySelector(".dday-list");
  const ddayContent = document.createElement("div");
  const ddayElement = document.createElement("div");
  const ddayTitle = document.createElement("p");
  const ddayResult = document.createElement("p");
  const deleteDdayButton = document.createElement("button");
  const ddaySubtitle = document.createElement("p");

  ddayContent.appendChild(ddayTitle);
  ddayContent.appendChild(ddaySubtitle);

  ddayElement.appendChild(ddayContent);
  ddayElement.appendChild(deleteDdayButton);
  ddayElement.appendChild(ddayResult);

  main.appendChild(ddayElement);

  deleteDdayButton.innerHTML = "X";
  ddayElement.classList.add("dday-element");

  deleteDdayButton.addEventListener("click", () => {
    deleteDday(deleteDdayButton.parentNode);
  });

  return [ddayTitle, ddaySubtitle, ddayResult];
};

const calculateDday = (target) => {
  const now = new Date();
  const lest = Math.floor((target.getTime() - now.getTime()) / 1000);
  const lestDate = Math.floor(lest / (60 * 60 * 24));

  const targetDate = lib.padInt(target.getFullYear()) + "-" + lib.padInt(Number(target.getMonth()) + 1) + "-" + lib.padInt(target.getDate());

  const resultDate = "D - " + String(Number(lestDate) + 1);

  return [targetDate, resultDate];
};

const addNewDday = (name, target) => {
  const [ddayTitle, ddaySubtitle, ddayResult] = createDdayElement();
  const [targetDate, resultDate] = calculateDday(target);

  ddayTitle.innerHTML = name;
  ddaySubtitle.innerHTML = targetDate;
  ddayResult.innerHTML = resultDate;
};

export { drawDday };
