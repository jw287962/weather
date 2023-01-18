import { getProcessedData } from "./weather";

function updateWeatherHTML(){
  const data = getProcessedData();

  const location = document.querySelector('.location');
  const humidity = document.querySelector('.humidity');
  const sunset = document.querySelector('.sunset');
  const sunrise = document.querySelector('.sunrise');
  const temp = document.querySelector('.temp');


  location.innerHTML = '<b>Location:</b> ';
  location.innerHTML += data.city;
  humidity.textContent = 'Humidity Level: ' + data.humidity ;
  sunrise.textContent = 'Sunrise ' +data.sunrise;
  sunset.textContent = 'Sunset ' + data.sunset;
  temp.textContent = data.temp;
}

export default updateWeatherHTML;