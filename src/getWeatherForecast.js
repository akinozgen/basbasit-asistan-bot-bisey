import axios from 'axios';
import { getVariable } from '../lib/getVariable.js';

export async function getWeatherForecast() {
  const lat = getVariable(process.eventNames, 'lat');
  const lng = getVariable(process.eventNames, 'lng');

  const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      appid: process.env.WEATHER_API_KEY,
      units: 'metric',
      lang: 'tr',
      lat,
      lon: lng,
    },
  });

  const temperature = response.data.main.temp;
  const description = response.data.weather[0].description;

  return `Şu an hava ${temperature} derece ve ${description}.`;
}
