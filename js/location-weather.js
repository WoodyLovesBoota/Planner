const key = "a0da403921cabb72edbfc43c1abe7772";

const getLocation = async () => {
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
};

const successCallback = (location) => {
  drawLocation(location);
};

const errorCallback = (error) => {
  console.log(error);
};

const getWeather = async (location) => {
  const [latitude, longitude] = [location.coords.latitude, location.coords.longitude];
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  const city = data.name;
  let temp = data.main.temp;
  const weatherCode = data.weather[0].icon;
  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherCode}@2x.png`;

  if (String(temp).length > 3) temp = String(temp).substring(0, 4);

  return [temp, weatherIconUrl, city];
};

const drawLocation = async (location) => {
  const weatherIcon = document.querySelector(".weather__icon");
  const cityName = document.querySelector(".location__city");
  const temperature = document.querySelector(".weather-temp__temperature");

  let [temp, weatherIconUrl, city] = await getWeather(location);

  weatherIcon.src = weatherIconUrl;
  cityName.innerHTML = city;
  temperature.innerHTML = temp;
};

export { getLocation };
