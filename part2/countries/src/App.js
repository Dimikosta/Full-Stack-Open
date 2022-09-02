import { useState, useEffect} from 'react'
import axios from 'axios';

const App = (props) => {
const [countries, setCountries] = useState([])
const [search, setSearch] = useState('')

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
      <DisplayWeather lat={country.capitalInfo.latlng[0]} lng={country.capitalInfo.latlng[1]} city={country.capital}/>
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

const DisplayWeather = (props) => {
  const [weather, setWeather] = useState(null)

  //API Key for weather service
  const api_key = process.env.REACT_APP_API_KEY 

  const weatherUrl = new URL("http://api.openweathermap.org/data/2.5/weather?")

  weatherUrl.searchParams.set("q", `${props.city}`)
  weatherUrl.searchParams.set("units", "metric")
  weatherUrl.searchParams.set("appid", `${api_key}`)

  const getWeather = () => {
    axios
      .get(weatherUrl)
      .then(response => {
        setWeather(response.data)
      })
  }

  useEffect(getWeather, [])

  const weatherIcon = weather?.weather[0].icon
  let iconUrl = new URL(`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`)

  return (
    <div>
      <div>
        Temperature: {weather?.main.temp} Celsius
      </div>
      <div>
        <img src={iconUrl} alt="Weather Icon"/>
      </div>
      <div>
        Wind: {weather?.wind.speed} m/s
      </div>
    </div>
  )
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