import * as todo from "./todo.js";
import * as dday from "./dday.js";
import * as clock from "./clock.js";
import * as location from "./location-weather.js";
import "./timer.js";

todo.drawTodos();
dday.drawDday();
location.getLocation();

setInterval(() => {
  clock.drawClock();
}, 1000);
