import { format, fromUnixTime } from 'date-fns';
import date from '../node_modules/date-fns'
let processedData = {};
const content = document.querySelector('.loading');
let processedForecast = {};



async function fetchWeatherForecast(location = "Madison"){
  try {
   
    content.textContent = "loading ... (please wait)";
    
    const city = location;

    const promise = await fetch(
      "https://api.openweathermap.org" +
        `/data/2.5/forecast?q=${city}&` +
        "APPID=19d6b05066109b1f4f25ae216d98acf3",
      { mode: "cors" }
    );

    const newData = await promise.json();
    console.log(newData.list);
      const dataArray = newData.list;
      let i = 0;
      processedForecast[`${city}`] = {};

      dataArray.forEach(element =>{
      processedForecast[`${city}`][i] = {date: 0};
        
        processedForecast[`${city}`][`${i}`].date = getDate(element,i);

        processedForecast[`${city}`][`${i}`].temp = getTemperature(element);
        processedForecast[`${city}`][`${i}`].description = getDescriptionForecast(element);

        i++;
      })
 
  
    content.textContent = "";
  } catch (err) {
    content.textContent = "Please type a valid location!";
    throw new Error("ERROR:" + err);
  }
}
function getDate(element,num){
  const addNum = num*86400000 + element.dt;

  const date = format(addNum,'iiiiii');
return date;

}
function getDescriptionForecast(element){
  const description = element.weather[0].description;

  let holder = capitalizeFirstLetter(description);
  return holder;

}
function getTemperature(element){
  const currentTemp = element.main.temp;

  const newTemp = ((1.8 * (currentTemp - 273) + 32)).toFixed(0);

  return newTemp;
}

function getProcessedForecast(){
  return processedForecast;
}


async function fetchWeatherCurrent(location = "Madison") {
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
    processedData.location = await checkLocation(newData);
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
  return data.sys.country;

}
function tempToFarenheit(data) {
  const currentTemp = data.main.temp;
  const newTemp = ((1.8 * (currentTemp - 273) + 32)).toFixed(0);
  return newTemp;
}
async function checkLocation(data) {

  const lat = (data.coord.lat);
  const lon =(data.coord.lon);
  const promise = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?` + 
  `lat=${lat}&lon=${lon}&limit=5&appid=19d6b05066109b1f4f25ae216d98acf3`,  { mode: "cors" })
  const locationData = await promise.json();
    console.log(locationData);
  return locationData;

  }

function getHumidity(data) {
  const currentHumidity = data.main.humidity;
  return currentHumidity + '%';
}

function getSunset(data) {
  const timeOfSunset = fromUnixTime(data.sys.sunset);
    const formattedTime = formatTime(timeOfSunset);
  return formattedTime;
}

function getSunrise(data) {
  const timeOfSunrise = fromUnixTime(data.sys.sunrise);
  const formattedTime = formatTime(timeOfSunrise);
  return formattedTime;
}

function formatTime(data){
  return format(new Date(data), 'pp');
}
function getProcessedData() {
  console.log(processedData);
  return processedData;
}
export {fetchWeatherForecast, fetchWeatherCurrent, 
  getProcessedData,getProcessedForecast
 };
