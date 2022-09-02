import { useState, useEffect} from 'react'
import axios from 'axios';

const App = (props) => {
const [countries, setCountries] = useState([])
const [weather, setWeather] = useState([])
const [search, setSearch] = useState('')

//API Key for weather service
const api_key = process.env.REACT_APP_API_KEY

// Gets Country data using API
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

const handleSearch = (event) => {
  setSearch(event.target.value)
}

const searchFilter = ( { countries } ) => {
  const filtered = countries.filter((country, index) => {
    let searchLC = search.toLowerCase()
    let countryLC = country.name.common.toLowerCase()
    return countryLC.includes(searchLC)
  })

  return filtered
}

const DisplayResults = ({ countries }) => {
  if (search === '') {
    return <p>Enter a Country</p>
  }
  let result = searchFilter({countries})
  if (result.length > 10) {
    return <div>Too Many Results</div>
  } else if (result.length === 1) {
      return <DisplayCountry country={result[0]} />
  } else if (result.length > 1 && result.length <=10) {
    return result.map((country, index) => {
    return (
        <div key={index}>{country.name.common}
        <button type = "submit" onClick = {() => setSearch(country.name.common) } >Show</button >
        </div>
    )
    })
  }
}

const DisplayCountry = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <div>Population: {country.population}</div>
      <h2>Languages:</h2>
      <DisplayLanguages languages={country.languages} />
      <img src={country.flags.png} alt="Country's Flag" />
      <h2>Weather in {country.capital}</h2>
      <p>latitude: {country.capitalInfo.latlng[0]}</p>
      <p>longitude: {country.capitalInfo.latlng[1]}</p>
      <DisplayWeather lat={country.capitalInfo.latlng[0]} lng={country.capitalInfo.latlng[1]} />
    </>
  )
}

const DisplayLanguages = ({languages}) => {
  const list = []
  for (const ele in languages) {
    list.push(languages[ele])
  }
  return (
    <ul>
    {list.map((lang, index) => <li key={index}>{lang}</li>)}
    </ul>
  )
}

const DisplayWeather = ({lat, lng}) => {
// Gets Weather data
useEffect(() => {
  axios
    .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly,daily,alerts&appid=${api_key}`)
    .then(response => {
      setWeather(response.data)
    })
})

  // return (
  //   <div>
  //     <p>Temperature: {weather.current.temp}</p>
  //     <img src={`http://openweathermap.org/img/wn/${weather.current.weather.icon}@2x.png`} alt="Weather Icon" />
  //     <p>Wind: {weather.current.wind_speed}</p>
  //   </div>
  // )

  console.log(weather)
  return <p>test</p>
}

  return (
    <div>
      <h1>Find Countries</h1>
      <input onChange={handleSearch} />
      <div>
        <DisplayResults countries={countries} />
      </div>
    </div>

  )
}

export default App;