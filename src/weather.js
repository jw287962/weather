import { format, fromUnixTime } from 'date-fns';
import date from '../node_modules/date-fns'
import { updateWeatherHTML } from './updateHTML';

let processedData = {};

async function fetchWeather(location = "Huntsville") {
  try {
    const city = location;

    const promise = await fetch(
      "https://api.openweathermap.org" +
        `/data/2.5/weather?q=${city}&` +
        "APPID=19d6b05066109b1f4f25ae216d98acf3",
      { mode: "cors" }
    );
    const newData = await promise.json();
    console.log(newData);
    processedData.city = newData.name;
    processedData.location = checkLocation(newData);
    processedData.humidity = getHumidity(newData);
    processedData.sunset = getSunset(newData);
    processedData.sunrise = getSunrise(newData);
    processedData.temp = tempToFarenheit(newData);
    updateWeatherHTML();
  } catch (err) {
    console.log("fetch ERROR:", err);
  }
}
function tempToFarenheit(data) {
  const currentTemp = data.main.temp;
  const newTemp = ((1.8 * (currentTemp - 273) + 32)).toFixed(2);
  console.log(newTemp, " F " );
  return newTemp + '°F';
}
function checkLocation(data) {
  const currentLocation = [];
  currentLocation.push(data.coord.lat);
  currentLocation.push(data.coord.lon);
  console.log(currentLocation[0] , currentLocation[1]);
  return currentLocation;
}

function getHumidity(data) {
  const currentHumidity = data.main.humidity;
  console.log(currentHumidity + "% humidity");
  return currentHumidity + '%';
}

function getSunset(data) {
  const timeOfSunset = fromUnixTime(data.sys.sunset);
    const formattedTime = formatTime(timeOfSunset);
  console.log("SUNSET: " + formattedTime);
  return formattedTime;
}

function getSunrise(data) {
  const timeOfSunrise = fromUnixTime(data.sys.sunrise);
  const formattedTime = formatTime(timeOfSunrise);
  console.log("SUNRISE: " + formattedTime);
  return formattedTime;
}

function formatTime(data){
  return format(new Date(data), 'pp');
}
function getProcessedData() {
  console.log(processedData);
  return processedData;
}
export { fetchWeather, getProcessedData };
