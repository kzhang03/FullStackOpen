import axios from 'axios'
const WEATHER_API = "8c795198d502497da96195430231307"

function capitalizeFirstLetter(string) {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

const getInfo = capitals => {
    const capital = capitalizeFirstLetter(capitals)
    return axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API}&q=${capital}&days=1&aqi=no&alerts=no`)
}

export default {
    getInfo: getInfo
}