import "./style.css";
import {getProcessedData,fetchWeather} from './weather';
import {addSearchListener,updateWeatherHTML} from './updateHTML'

let promise = fetchWeather('Madison');
console.log(promise);


promise
.then(() => {
  console.log(promise);
  updateWeatherHTML();
})
.catch((err) => {
  console.log('ERR:', err);
});
addSearchListener();


const refreshButton = document.querySelector('.refresh');
refreshButton.addEventListener('click',refreshData);

function refreshData(){
  
}


// FUNCTIONS

