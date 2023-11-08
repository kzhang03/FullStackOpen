import { useState, useEffect } from 'react'
import countryService from './services/countries'
import SearchCountries from './components/SearchCountries'
import DisplayCountries from './components/DisplayCountries'

const App = () => {
  const [countries, newCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    countryService
     .getAll()
     .then(response => {
      const countryInfo = response.data.map(country => 
        ({"name": country["name"]["common"],
          "cca3": country["cca3"],
          "capital": country["capital"],
          "area": country["area"],
          "languages": country["languages"],
          "flags": country["flags"]
         }
        )
      )
      newCountries(countryInfo)
     })
  }, [])

  const filterCountry = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <SearchCountries newSearch={newSearch} filterCountry={filterCountry} />
      <DisplayCountries countries={countries} keyword={newSearch} setSearch={setNewSearch} />
    </div>
  )
}

export default App