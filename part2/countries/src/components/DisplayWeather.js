// Gets and displays Weather data
import { useState, useEffect} from 'react'
import axios from 'axios'

const DisplayWeather = (props) => {
  const [weather, setWeather] = useState(null)

  // Open-Meteo.org API
  const getWeather = () => {
    axios
      .get(`https://api.open-meteo.com/v1/forecast?latitude=${props.lat}&longitude=-${props.lng}&current_weather=true`)
      .then(response => {
        setWeather(response.data)
      })
  }

  useEffect(getWeather, [])

  return (
    <div>
      <p>Temperature: {weather.current_weather.temperature} Celsius</p>
      <p>Wind: {weather.current_weather.windspeed} km/h</p>
      <img src={`http://openweathermap.org/img/wn/${weather2.current.weather[0].icon}@2x.png`} alt="Weather Icon" />
    </div>
  )
}

export default DisplayWeather