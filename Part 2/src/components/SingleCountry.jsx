import React, { useState, useEffect } from 'react'
import weather from '../services/weatherAPI'

const SingleCountry = ({ country }) => {
    const [weatherInfo, setWeatherInfo] = useState(null)
  
    useEffect(() => {
      if (country.capital[0]) {
        weather
          .getInfo(country.capital[0])
          .then(response => {
            const info = response.data;
            setWeatherInfo({
              temperature: info.current.temp_c,
              weather: info.current.condition.text,
              weather_icon: info.current.condition.icon,
              wind_kph: info.current.wind_kph
            })
          })
          .catch(error => {
            console.error("Error fetching weather info:", error)
            setWeatherInfo(null)
          })
      }
    }, [country])
  
    return (
      <div>
        <h1>{country.name}</h1>
        <div>capital {country.capital[0]}</div>
        <div>area {country.area}</div>
        <p><b>languages:</b></p>
        <ul>
          {Object.values(country.languages).map((language, i) =>
            <li key={i}>{language}</li>
          )}
        </ul>
        <div>
          <img 
            src={country.flags.svg} 
            alt={`Flag of ${country.name}`} 
            style={{ width: '100px', height: 'auto' }}
          />
        </div>
        {weatherInfo && (
          <div>
            <h2>Weather in {country.capital[0]}</h2>
            <p>{weatherInfo.temperature} °C</p>
            <p>{weatherInfo.weather}</p>
            <img src={weatherInfo.weather_icon} alt={`Weather icon for ${weatherInfo.weather}`} />
            <p>Wind: {weatherInfo.wind_kph} km/h</p>
          </div>
        )}
      </div>
    )
}

export default SingleCountry