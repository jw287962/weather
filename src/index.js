import "./style.css";
import {getProcessedData,fetchWeather} from './weather';
import {addSearchListener,updateWeatherHTML, refreshData,
  promiseEvalUpdateHTML
} from './updateHTML'


let locations = [];
let promise = fetchWeather('Madison');
console.log(promise);

promiseEvalUpdateHTML(promise);

addSearchListener();

const refreshButton = document.querySelector('.refresh');
refreshButton.addEventListener('click',refreshData);



// FUNCTIONS

