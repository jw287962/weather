import { format, fromUnixTime } from 'date-fns';
import date from '../node_modules/date-fns'


let processedData = {};
const content = document.querySelector('.loading');

async function fetchWeather(location = "Huntsville") {
  try {
   
    content.textContent = "loading ... (please wait)";
    
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
    processedData.country = getCountry(newData);
    processedData.description = getDescription(newData);
  
    content.textContent = "";
  } catch (err) {
    content.textContent = "Please type a valid location!";
    throw new Error("ERROR:" + err);
  }
}
function getDescription(data){
  let description = data.weather[0].description;
 description = capitalizeFirstLetter(description);
  return description;

}
function capitalizeFirstLetter(input){
  let description = input;
  let array = description.split(' ');
  description = '';
  array.forEach(element => {
    description += element.charAt(0).toUpperCase() + element.slice(1) + " ";
    
  });
  return description;
}

function getCountry(data){
  console.log(data.sys.country);
  return data.sys.country;

}
function tempToFarenheit(data) {
  const currentTemp = data.main.temp;
  const newTemp = ((1.8 * (currentTemp - 273) + 32)).toFixed(2);
  console.log(newTemp, " F " );
  return newTemp;
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
