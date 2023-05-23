import {
  getProcessedData,
  getProcessedForecast,
  fetchWeatherForecast,
} from "./weather";
import { fetchWeatherCurrent } from "./weather";

let locations = [];

function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(
  require.context("./asset/images", false, /\.(png|jpe?g|svg)$/)
);

function updateWeatherHTML() {
  const data = getProcessedData();
  const content = document.querySelector(".content");
  const weatherDetails = document.createElement("div");
  weatherDetails.classList.add("weatherdetails");
  weatherDetails.classList.add(`${data.city}`);
  const sunDetails = document.createElement("div");
  sunDetails.classList.add("sundetails");
  content.appendChild(weatherDetails);

  const location = document.createElement("div");
  location.classList.add("location");
  const humidity = document.createElement("div");
  humidity.classList.add("humidity");
  const tempdiv = document.createElement("div");
  tempdiv.classList.add("temp");
  const description = document.createElement("div");
  description.classList.add("description");

  const sunset = document.createElement("div");
  sunset.classList.add("sunset");
  const sunrise = document.createElement("div");
  sunrise.classList.add("sunrise");
  const country = document.createElement("div");
  sunrise.classList.add("country");

  location.textContent += data.city + ", " + data.location[0].state;
  sunrise.classList.add("country");
  humidity.textContent = data.humidity + " Humidity ";

  // TEMPERATURE SPANS

  const tempDegrees = document.createElement("span");
  tempDegrees.textContent = data.temp;
  tempDegrees.classList.add("tempdegree");
  const tempSymbol = document.createElement("span");
  tempSymbol.textContent = "°F";
  tempSymbol.classList.add("tempsymbol");
  tempdiv.appendChild(tempDegrees);
  tempdiv.appendChild(tempSymbol);

  description.textContent = data.description;

  sunrise.textContent = "Sunrise " + data.sunrise;
  sunset.textContent = "Sunset " + data.sunset;
  country.textContent = data.country;

  const forecastButtonDiv = document.createElement("div");
  forecastButtonDiv.classList.add("forecastbuttons");

  const removeForecastButton = document.createElement("button");
  removeForecastButton.classList.add("forecastday");
  removeForecastButton.setAttribute("id", `${data.city}`);
  removeForecastButton.textContent = "1 Day";
  removeForecastButton.addEventListener("click", removeForecast);

  const forecastWeekButton = document.createElement("button");
  forecastWeekButton.classList.add("forecastweek");
  forecastWeekButton.setAttribute("id", `${data.city}`);
  forecastWeekButton.addEventListener("click", showForecast);
  forecastWeekButton.textContent = "7 Days";

  const forecastMonthButton = document.createElement("button");
  forecastMonthButton.classList.add("forecastmonth");
  forecastMonthButton.setAttribute("id", `${data.city}`);
  forecastMonthButton.textContent = "30 Days";
  forecastMonthButton.addEventListener("click", showForecast);

  forecastButtonDiv.appendChild(removeForecastButton);
  forecastButtonDiv.appendChild(forecastWeekButton);
  forecastButtonDiv.appendChild(forecastMonthButton);

  weatherDetails.appendChild(location);
  weatherDetails.appendChild(tempdiv);
  weatherDetails.appendChild(description);
  weatherDetails.appendChild(humidity);
  sunDetails.appendChild(country);
  sunDetails.appendChild(sunset);
  sunDetails.appendChild(sunrise);
  weatherDetails.appendChild(forecastButtonDiv);
  weatherDetails.appendChild(sunDetails);
}
//  1, 7, 14 days
function removeForecast(event) {
  const location = event.target.id;
  const forecastDiv = document.getElementsByClassName(`forecast ${location}`);
  forecastDiv[0].remove();
}
function showForecast(event) {
  event.preventDefault();
  const location = event.target.id;
  console.log(location);
  const forecastDiv = document.getElementsByClassName(`forecast ${location}`);
  if (forecastDiv.length > 0) {
    forecastDiv[0].remove();
  }
  let days;
  if (event.target.textContent.includes("30")) {
    days = 30;
  } else {
    days = 7;
  }
  let forecast = getProcessedForecast();
  const forecastWrapDiv = document.createElement("div");
  forecastWrapDiv.classList.add("forecastwrap");
  const weatherDetails = document.querySelector(`.${location}`);
  const newDiv = document.createElement("div");
  newDiv.classList.add("forecast");
  newDiv.classList.add(`${location}`);

  weatherDetails.appendChild(forecastWrapDiv);
  forecastWrapDiv.appendChild(newDiv);

  for (let i = 0; i < days; i++) {
    const date = forecast[`${location}`][`${i}`].date;
    const temp = forecast[`${location}`][`${i}`].temp;
    const description = forecast[`${location}`][`${i}`].description;
    addForeCastHTML(date, temp, description, location);
  }
}

function addForeCastHTML(date, temp, description, location) {
  const weatherDetails = document.querySelector(`.${location}`);
  const holderDiv = weatherDetails.lastChild.lastChild;

  const dayDiv = document.createElement("div");
  dayDiv.classList.add("day");
  const dateDiv = document.createElement("div");

  const tempDiv = document.createElement("div");
  tempDiv.classList.add("temperature");
  const descriptionDiv = document.createElement("img");

  dateDiv.textContent = date;
  if ((temp * 10) / 10 > 50) {
    tempDiv.setAttribute("id", "hot");
  } else tempDiv.setAttribute("id", "cold");
  tempDiv.textContent = temp + "°F";
  descriptionDiv.src = images[imageNum(description)];
  holderDiv.appendChild(dayDiv);
  dayDiv.appendChild(dateDiv);
  dayDiv.appendChild(tempDiv);
  dayDiv.appendChild(descriptionDiv);
}

function imageNum(description) {
  if (description.includes("Cloud")) {
    return 0;
  } else if (description.includes("Rain")) return 1;
  else if (description.includes("Sun")) return 2;
  else {
    return 3;
  }
}
function addSearchListener() {
  const searchForm = document.querySelector(".locationform");
  searchForm.addEventListener("submit", getSearchData);
}

async function getSearchData(event) {
  event.preventDefault();
  const content = document.querySelector(".loading");
  const searchData = document.querySelector("#location");
  let data = searchData.value;
  let hasEntered = false;
  locations.forEach((element) => {
    if (element === data) {
      hasEntered = true;
    }
  });
  if (!hasEntered) {
    console.log(data);
    await fetchWeatherCurrent(data);
    promiseEvalUpdateHTML(data);
  }
  content.textContent = "Unique Locations Only!";
}

function promiseEvalUpdateHTML(data) {
  try {
    updateWeatherHTML();
    locations.push(data);
    fetchWeatherForecast(data);
  } catch (error) {
    console.log("ERR:", err);
  }
}

function promiseEvalRefreshHTML(promise) {
  promise
    .then(() => {
      updateWeatherHTML();
    })
    .catch((err) => {
      console.log("ERR:", err);
    });
}

function refreshData() {
  const allWeatherDetails = document.querySelectorAll(".weatherdetails");
  allWeatherDetails.forEach((element) => {
    element.remove();
  });
  console.log(locations);
  locations.forEach((element) => {
    let promise = fetchWeatherCurrent(element);
    promiseEvalRefreshHTML(promise);
  });
}

export {
  updateWeatherHTML,
  addSearchListener,
  refreshData,
  promiseEvalUpdateHTML,
};
