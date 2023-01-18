import "./style.css";
import {getProcessedData,fetchWeather} from './weather';

fetchWeather('Madison');
let weatherData = getProcessedData();



console.log(weatherData);

// FUNCTIONS
