import "./style.css";
import {getProcessedData,fetchWeather} from './weather';
import {addSearchListener} from './updateHTML'

fetchWeather('Madison');
let weatherData = getProcessedData();

addSearchListener();

console.log(weatherData);

// FUNCTIONS
