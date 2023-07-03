// search
const searchBtn = document.querySelector(".search-btn");
const nameCity = document.querySelector(".name-city");
const weatherImage = document.querySelector(".weather-image");
const errorText = document.querySelector(".text-error");
const degWind = document.querySelector(".deg-wind");
const rangeHumidity = document.querySelector(".range-humidity");
const changeUv = document.querySelector(".change-uv");
const changeVisibility = document.querySelector(".change-vis");
// day & night mood
const nightMood = document.querySelector(".night-mood");
const dayMood = document.querySelector(".day-mood");
// dark mode
const darkIcon = document.querySelector(".dark-icon");
const lightIcon = document.querySelector(".light-icon");
const userTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme : dark").matches;
// forecast
const forecastHour = document.querySelector(".forecast-hour ");
const weeklyBtn = document.querySelector(".weekly-btn");
const hourlyBtn = document.querySelector(".hourly-btn");
const weekDayContainer = document.querySelector(".week-days-container");
// sunset & sunrise
const sunRotate = document.querySelector(".sun-rotate");
// key Api
const weatherKey = "8e9f91f36f3446df82b94432231502";
let unsplashKey = "dUvoxhzRH5e6sjuQGR157Z9AdYihZEaj6-_bw6NvYIc";

console.log(weatherKey);
console.log(unsplashKey);

// dark mode : theme check
const themeCheck = () => {
  if (userTheme === "dark" || (!userTheme && systemTheme)) {
    document.documentElement.classList.add("dark");
    darkIcon.classList.add("hidden");
    return;
  }
  lightIcon.classList.add("hidden");
};

// WithOut API ------------
//day today
function DayAndTimeToday() {
  let n = new Date();
  let day = n.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let today = days[day];
  setInnerText("today", today);
}
DayAndTimeToday();

// update time and shot it
function updateTime() {
  const currentTime = new Date().toLocaleTimeString([], { timeStyle: "short" });
  setInnerText("time", currentTime);
}
setInterval(updateTime, 1000);

// API -------------------
// action search
searchBtn.addEventListener("click", forecastDay);

// API :search city
async function forecastDay(e) {
  e.preventDefault();
  const city = document.querySelector(".get-city").value;

  try {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${weatherKey}&q=${city}&days=7&aqi=no&alerts=no`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Bad response from server");
    }

    const data = await response.json();
    handleForecastData(data);
  } catch (error) {
    handleError();
  }
}

function handleForecastData(data) {
  errorText.classList.add("hidden");
  forecastHourly(data);
  selectForecast(data);
  directionWind(data);
  informationCity(data);
  nightDay(data);
  sunTime(data);
  getUvIndex(data);
  humidity(data);
  speedWind(data);
  visibility(data);
  descriptionDay(data);
  maxMinTemperature(data);
  descriptionImage(data);
  darkMode(data);
}

function handleError() {
  errorText.classList.remove("hidden");
  console.log("error");
  weatherImage.setAttribute("src", `./src/img/error/error.png`);
}

// Max-Min Temperature
function maxMinTemperature(data) {
  let minTemp = data.forecast.forecastday[0].day.mintemp_c;
  let maxTemp = data.forecast.forecastday[0].day.maxtemp_c;

  setInnerText("minTemp", minTemp);
  setInnerText("maxTemp", maxTemp);
}

// description day
function descriptionDay(data) {
  let temp = data.current.temp_c;
  let weather = data.current.condition.text;

  setInnerText("weather", weather);
  setInnerText("temp", temp);
}

// visibility
function visibility(data) {
  let visibility = data.current.vis_km;
  setInnerText("Visibility", visibility);
  setInnerText("statusVisibility", statusVisibility(visibility));
}
//status visibility
function statusVisibility(v) {
  let status;
  if (v <= 0.03) {
    status = "Dense Fog";
    changeVisibility.style.setProperty("--vis", `${0}px`);
  } else if (v <= 0.16) {
    status = "Moderate Fog";
    changeVisibility.style.setProperty("--vis", `${15}px`);
  } else if (v <= 0.35) {
    status = "Light Fog";
    changeVisibility.style.setProperty("--vis", `${30}px`);
  } else if (v <= 1.13) {
    status = "Very Light Fog";
    changeVisibility.style.setProperty("--vis", `${45}px`);
  } else if (v <= 2.16) {
    status = "Light Mist";
    changeVisibility.style.setProperty("--vis", `${60}px`);
  } else if (v <= 5.4) {
    status = "Very Light Mist";
    changeVisibility.style.setProperty("--vis", `${75}px`);
  } else if (v <= 10.8) {
    status = "Clear Air";
    changeVisibility.style.setProperty("--vis", `${90}px`);
  } else {
    status = "Very Clear Air";
    changeVisibility.style.setProperty("--vis", `${94}px`);
  }
  return status;
}

// wind today
function speedWind(data) {
  let SpeedWind = data.current.wind_kph;
  setInnerText("speed", SpeedWind);
}
// humidity
function humidity(data) {
  let humidity = data.current.humidity;
  rangeHumidity.value = humidity;
  setInnerText("humidity", humidity);
  setInnerText("statusHumidity", statusHumidity(humidity));
}

// status humidity
function statusHumidity(h) {
  let status;
  if (h <= 30) {
    status = "Low";
  } else if (h <= 60) {
    status = "Moderate";
  } else {
    status = "High";
  }
  return status;
}
//get uv index
async function getUvIndex(data) {
  let unIndex = data.current.uv;
  let statusUv = statusUvIndex(unIndex);
  setInnerText("unIndex", unIndex);
  setInnerText("uvStatus", statusUv);
}
// set text
function setInnerText(id, text) {
  document.getElementById(id).innerText = text;
}
// uv index status
function statusUvIndex(uvIndex) {
  let status;
  if (uvIndex <= 2) {
    status = "Low";
    changeUv.style.setProperty("--uv", `${0}px`);
  } else if (uvIndex <= 5) {
    status = "Moderate";
    changeUv.style.setProperty("--uv", `${15}px`);
  } else if (uvIndex <= 7) {
    status = "High";
    changeUv.style.setProperty("--uv", `${32}px`);
  } else if (uvIndex <= 10) {
    status = "Very High";
    changeUv.style.setProperty("--uv", `${49}px`);
  } else {
    status = "Extreme";
    changeUv.style.setProperty("--uv", `${64}px`);
  }
  return status;
}
// sunset & sunrise two
function sunTime(data) {
  let displaysSun = document.querySelector(".sun-moon");
  let localTime = data.location.localtime.split(" ")[1];
  let sunrise = getTwentyFourHourTime(data.forecast.forecastday[0].astro.sunrise);
  let sunset = getTwentyFourHourTime(data.forecast.forecastday[0].astro.sunset);
  let sunriseTomorrow = getTwentyFourHourTime(data.forecast.forecastday[1].astro.sunrise);
  let isDay = data.current.is_day;
  let secondSunrise = getSeconds(sunrise);
  let secondSunset = getSeconds(sunset);
  let secondLocalTime = getSeconds(localTime);
  // day rotate sun
  if (isDay) {
    let durationDay = secondSunset - secondSunrise;
    let percentDay = (secondLocalTime - secondSunrise) / durationDay;
    let rotate = percentDay * 135 + 10;

    sunRotate.style.setProperty("--rot", `${rotate}deg`);

    setInnerText("sunRise", sunrise);
    setInnerText("sunSet", sunset);
    setInnerText("localTime", localTime);
    displaysSun.classList.replace("bg-white", "bg-yellow-400");
    displaysSun.classList.add("shadow-[0px_0px_11px_10px_#faf089]");
  } else {
    // night rotate moon
    let secondSunriseTomorrow = getSeconds(sunriseTomorrow);
    let fullTime = 86400;
    let durationNight = fullTime - secondSunset + secondSunriseTomorrow;

    let percentNight;
    if (Number(localTime.split(":")[0]) >= 12) {
      percentNight = (secondLocalTime - secondSunset) / durationNight;
    } else {
      percentNight = secondLocalTime + (fullTime - secondSunset) / durationNight;
    }

    let rotate = percentNight * 135 + 10;

    sunRotate.style.setProperty("--rot", `${rotate}deg`);
    setInnerText("sunRise", sunset);
    setInnerText("sunSet", sunriseTomorrow);
    setInnerText("localTime", localTime);
    displaysSun.classList.replace("bg-yellow-400", "bg-white");
    displaysSun.classList.remove("shadow-[0px_0px_11px_10px_#faf089]");
  }
}

// convert am pm time to 24 time all
function getTwentyFourHourTime(amPmString) {
  var d = new Date("1/1/2013 " + amPmString);
  return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
}

// convert hh:mm to seconds
function getSeconds(time) {
  let [hours, minutes] = time.split(":");

  let hs = hours * 3600;
  let ms = minutes * 60;
  let seconds = hs + ms;

  return seconds;
}

// change background
function nightDay(data) {
  let isDay = data.current.is_day;

  if (isDay) {
    dayMood.classList.remove("hidden");
    nightMood.classList.add("hidden");
  } else {
    dayMood.classList.add("hidden");
    nightMood.classList.remove("hidden");
  }
}

// info city
function informationCity(data) {
  let city = data.location.name;
  let country = data.location.country;
  setInnerText("country", country);
  setInnerText("city", city);
}

// select type forecast
function selectForecast(data) {
  weeklyBtn.addEventListener("click", () => {
    weeklyBtn.classList.add("active-btn");
    hourlyBtn.classList.remove("active-btn");
    forecastWeekly(data);
  });
  hourlyBtn.addEventListener("click", () => {
    hourlyBtn.classList.add("active-btn");
    weeklyBtn.classList.remove("active-btn");
    forecastHourly(data);
  });
}

// forecast hourly
function forecastHourly(data) {
  forecastHour.innerHTML = "";
  let hour = 0;
  for (let i = 0; i < 24; i++) {
    let card = document.createElement("div");
    let timeTemp = data.forecast.forecastday[0].hour[hour].time.slice(11);
    let iconTemp = data.forecast.forecastday[0].hour[hour].condition.icon;

    let maxTemp = data.forecast.forecastday[0].hour[hour].temp_c;
    // create card
    card.innerHTML = `
    <div class="m-1 flex h-[90%] md:w-20 w-14 flex-col items-center font-semibold justify-between rounded-md border opacity-95 backdrop-blur-3xl border-indigo-600">
       <p class="text-black dark:text-yellow-500 font-semibold" >${timeTemp}</p>
       <img src="${iconTemp}" class="" />
       <p class="text-black dark:text-white">${maxTemp}&#176;</p>
    </div>
    `;
    // add to forecast
    forecastHour.appendChild(card);
    hour++;
  }
}
// forecast weekly
function forecastWeekly(data) {
  forecastHour.innerHTML = "";
  let day = 0;
  for (let i = 0; i < 7; i++) {
    let card = document.createElement("div");
    let dateDay = data.forecast.forecastday[day].date;

    let date = new Date(dateDay);

    let nameDay = date.toString().split(" ")[0];

    let iconTemp = data.forecast.forecastday[day].day.condition.icon;
    let averageTemp = data.forecast.forecastday[day].day.avgtemp_c;
    // create card
    card.innerHTML = `
    <div class="m-1 flex h-[90%] md:w-20 w-14 flex-col items-center font-semibold justify-between rounded-md opacity-95 backdrop-blur-3xl  border border-indigo-600">
       <p class="text-black dark:text-yellow-500 font-semibold">${nameDay}</p>
       <img src="${iconTemp}" class="" />
       <p class="text-black dark:text-white">${averageTemp}&#176;</p>
    </div>
    `;
    // add to forecast
    forecastHour.appendChild(card);
    day++;
  }
}
// scroll horizontally with mouse wheel
forecastHour.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  forecastHour.scrollLeft += evt.deltaY;
});

// direction wind
function directionWind(data) {
  let nameDir = data.current.wind_dir;
  let windDeg = data.current.wind_degree;

  degWind.style.setProperty("--deg", `${windDeg}deg`);

  setInnerText("wind-dir", nameDir);
}

// dark mode & light mode
function darkMode(data) {
  let isDay = data.current.is_day;

  if (isDay) {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }
}

// night sky
function starSky() {
  const nightSky = document.querySelector(".night-sky");

  for (let i = 0; i < 500; i++) {
    let star = document.createElement("i");

    let x = Math.floor(Math.random() * window.innerWidth);
    let y = Math.floor(Math.random() * window.innerHeight);
    let duration = Math.random() * 10;
    let size = Math.floor(Math.random() * 2);

    star.style.left = x + "px";
    star.style.top = y + "px";
    star.style.width = 1 + size + "px";
    star.style.height = 1 + size + "px";

    star.style.animationDuration = 5 + duration + "s";
    star.style.animationDelay = duration + "s";

    nightSky.appendChild(star);
  }
}
starSky();

// day sky
function daySky() {
  const daySky = document.querySelector(".day-sky");

  for (let i = 0; i < 3; i++) {
    let bird = document.createElement("img");
    let duration = Math.random() * 10;
    let top = Math.floor(Math.random() * 700 + 1) + "px";

    bird.style.top = top;
    bird.style.animationDuration = 5 + duration + "s";
    bird.style.animationDelay = duration + "s";

    daySky.appendChild(bird);
  }
}
daySky();

// weather image day
function descriptionImage(data) {
  const srcImg = data.current.condition.icon;

  let dayOrNight = srcImg.split("/")[5];

  let number = srcImg.split("/")[6].split(".")[0];

  let newSrcImg;
  if (dayOrNight === "day") {
    newSrcImg = `./src/img/weather/day/${number}.png`;
  } else {
    newSrcImg = `./src/img/weather/night/${number}.png`;
  }
  weatherImage.setAttribute("src", newSrcImg);
}

searchBtn.addEventListener("click", searchImage);
let searchImg = document.querySelector(".search-Image");

// search image of unsplash

async function searchImage() {
  const city = document.querySelector(".get-city").value;

  const url = `https://api.unsplash.com/search/photos?query=${city}&per_page=30&client_id=${unsplashKey}`;

  // fetch
  const response = await fetch(url);
  let data = await response.json();

  let index = Math.floor(Math.random() * 30);

  let srcImage = `${data.results[index].urls.raw}&w=600&h=400`;

  searchImg.setAttribute("src", srcImage);
}

// forecast days

const weekNames = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
weekNames.map((weekName) => {
  let daysWeek = document.createElement("div");

  daysWeek.innerHTML = `
      <div class="week-days">
        <p>${weekName}</p>
        <img src="./src/img/weather/sunImage.webp" />
        <p class="text-black dark:text-white">0&#176;</p>
      </div>
    `;
  weekDayContainer.appendChild(daysWeek);
});
