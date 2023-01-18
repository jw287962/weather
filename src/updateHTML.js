import { getProcessedData } from "./weather";
import { fetchWeather } from "./weather";
function updateWeatherHTML(){
  const data = getProcessedData();
  const content = document.querySelector('.content');
  const weatherDetails = document.createElement('div');
  weatherDetails.classList.add('weatherdetails');

  const sunDetails = document.createElement('div');
  sunDetails.classList.add('sundetails');
  content.appendChild(weatherDetails);


  const location = document.createElement('div');
  location.classList.add('location');
  const humidity = document.createElement('div');
  humidity.classList.add('humidity');
  const sunset = document.createElement('div');
  sunset.classList.add('sunset');
  const sunrise = document.createElement('div');
  sunrise.classList.add('sunrise');
  const temp = document.createElement('div');
  temp.classList.add('temp');

  location.innerHTML = '<b>Location:</b> ';
  location.innerHTML += data.city;
  humidity.textContent = data.humidity +  ' Humidity ';

  
  sunrise.textContent = 'Sunrise ' +data.sunrise;
  sunset.textContent = 'Sunset ' + data.sunset;
  temp.textContent = data.temp;


  weatherDetails.appendChild(location);
  weatherDetails.appendChild(temp);

  weatherDetails.appendChild(humidity);
  sunDetails.appendChild(sunset);
  sunDetails.appendChild(sunrise);
  weatherDetails.appendChild(sunDetails);



}

function addSearchListener(){
  
  const searchForm = document.querySelector('.locationform');
  searchForm.addEventListener('submit',getSearchData)
}

function getSearchData(event){
  event.preventDefault();
  const searchData = document.querySelector('#location');
  let data = searchData.value;

  fetchWeather(data);
}

export { updateWeatherHTML, addSearchListener };