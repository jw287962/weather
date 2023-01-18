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
  const tempdiv = document.createElement('div');
  tempdiv.classList.add('temp');
  const description = document.createElement('div');
  description.classList.add('description');

  const sunset = document.createElement('div');
  sunset.classList.add('sunset');
  const sunrise = document.createElement('div');
  sunrise.classList.add('sunrise');
  const country = document.createElement('div');
  sunrise.classList.add('country');


  location.textContent += data.city;
  sunrise.classList.add('country');
  humidity.textContent = data.humidity +  ' Humidity ';

  // TEMPERATURE SPANS

  const tempDegrees = document.createElement('span');
  tempDegrees.textContent = data.temp;
  tempDegrees.classList.add('tempdegree')
  const tempSymbol = document.createElement('span');
  tempSymbol.textContent = '°F';
  tempSymbol.classList.add('tempsymbol');
  tempdiv.appendChild(tempDegrees);
  tempdiv.appendChild(tempSymbol);
  
  description.textContent = data.description;

  sunrise.textContent = 'Sunrise ' + data.sunrise;
  sunset.textContent = 'Sunset ' + data.sunset;
  country.textContent = data.country;



  weatherDetails.appendChild(location);
  weatherDetails.appendChild(tempdiv);
  weatherDetails.appendChild(description);
  weatherDetails.appendChild(humidity);
  sunDetails.appendChild(country);
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

 let promise =  fetchWeather(data);
console.log(promise);
  promise
  .then(() => {
    updateWeatherHTML();
  })
  .catch((err) => {
    console.log('CAUGHT ERROR:', err);
  });
}

export { updateWeatherHTML, addSearchListener };