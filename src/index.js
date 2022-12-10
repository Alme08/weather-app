import './styles/styles.css';
import getWeatherData from './modules/fetch';

const form = document.querySelector('#form');
const input = document.querySelector('#city');

const getWeather = () => {
  const weatherData = getWeatherData(input.value).catch((err) => console.log(`ERROR: ${err}`));
  weatherData.then((cb) => {
    console.log(cb);
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
  validate();
  //   getWeather();
  input.value = '';
});

window.addEventListener('load', () => {
  input.value = 'London';
  getWeather();
  input.value = '';
});
