import './styles/styles.css';
import { getWeatherData, spanError } from './modules/fetch';

const switchButton = document.querySelector('#switch');
const form = document.querySelector('#form');
const input = document.querySelector('#city');
const msg = document.querySelector('#msg');
let cont = 0;
// data
const temp = document.querySelector('#temp');
const place = document.querySelector('#place');
const description = document.querySelector('#description');
const windSpeed = document.querySelector('#windSpeed');
const humidity = document.querySelector('#humidity');
const img = document.querySelector('#img');

const getWeather = (city) => {
  const weatherData = getWeatherData(city).catch((err) => console.log(`ERROR: ${err}`));
  weatherData.then((cb) => {
    if (cont === 0) {
      temp.textContent = `${(cb.temp - 273.15).toFixed(2)} °C`;
      windSpeed.textContent = `${(cb.windSpeed * 3.6).toFixed(2)} km/h`;
    } else {
      temp.textContent = `${((cb.temp - 273.15) * (9 / 5) + 32).toFixed(2)} °F`;
      windSpeed.textContent = `${(cb.windSpeed * 2.237).toFixed(2)} mph`;
    }
    place.textContent = cb.name;
    description.textContent = cb.description;
    humidity.textContent = `${cb.humidity}%`;
    img.src = `img/${cb.icon}.png`;
  });
};
const validate = () => {
  const city = input.value.trim();
  if (city.match(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)) {
    return true;
  }
  return false;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (validate()) {
    getWeather(input.value);
    msg.textContent = '';
  } else {
    spanError();
  }
  input.value = '';
});

window.addEventListener('load', () => {
  getWeather('London');
  const loadingScren = document.querySelector('.loading');
  loadingScren.classList.add('display-none');
});
switchButton.addEventListener('click', () => {
  if (cont === 0) {
    switchButton.textContent = 'Switch to °C';
    cont = 1;
    getWeather(place.textContent);
  } else {
    switchButton.textContent = 'Switch to °F';
    cont = 0;
    getWeather(place.textContent);
  }
});
