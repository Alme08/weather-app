export const spanError = () => {
  const msg = document.querySelector('#msg');
  msg.textContent = 'Location not found. Search must be in the form of "City".';
};
export async function getWeatherData(location) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=f34380ca38b56589afca488fdb849b6a`, { mode: 'cors' });
    const weatherData = await response.json();
    return {
      main: weatherData.weather[0].main,
      description: weatherData.weather[0].description,
      temp: weatherData.main.temp,
      feelsLike: weatherData.main.feels_like,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
      timezone: weatherData.timezone,
      name: weatherData.name,
      icon: weatherData.weather[0].icon,
    };
  } catch (error) {
    console.log(error);
    spanError();
  }
}
