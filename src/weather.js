const axios = require('axios');

module.exports = async function getWeatherForecast() {
    // Use the OpenWeatherMap API to get the weather forecast for Antalya, Turkey
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: 'Antalya,tr',
            appid: process.env.WEATHER_API_KEY,
            units: 'metric',
            lang: 'tr',
        },
    });

    // Construct a response text from the weather forecast data
    const temperature = response.data.main.temp;
    const description = response.data.weather[0].description;

    return {
        description,
        temperature,
    }
}