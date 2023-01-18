import "./style.css";
import {getProcessedData,fetchWeatherCurrent,fetchWeatherForecast} from './weather';
import {addSearchListener,updateWeatherHTML, refreshData,
  promiseEvalUpdateHTML
} from './updateHTML'


let defaultLocation = 'Madison';
let promise = fetchWeatherCurrent(defaultLocation);

promiseEvalUpdateHTML(promise,defaultLocation);

addSearchListener();

const refreshButton = document.querySelector('.refresh');
refreshButton.addEventListener('click',refreshData);



// FUNCTIONS

