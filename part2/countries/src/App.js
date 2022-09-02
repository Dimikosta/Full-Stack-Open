import { useState, useEffect} from 'react'
import axios from 'axios';

const App = (props) => {
const [countries, setCountries] = useState([])
const [search, setSearch] = useState('')


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
    return result.map((country, index) => <div key={index}>{country.name.common}</div>)
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