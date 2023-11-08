import React from 'react'
import SingleCountry from './SingleCountry'

const DisplayCountries = ({ countries, keyword, setSearch }) => {
    const filteredCountries = keyword === ''
      ? countries
      : countries.filter(country =>
          country.name.toLowerCase().includes(keyword.toLowerCase())
        )
    if (filteredCountries.length === 1) {
      return (
        <SingleCountry country={filteredCountries[0]} />
      )
    }
    else {
      const changeSearch = name => {
        setSearch(name)
      }
      return (
        filteredCountries.map(country => 
          <div key={country["cca3"]}>
            {country["name"]} <button onClick={() => changeSearch(country["name"])}>show</button>
          </div>
          )
      )
    }
}

export default DisplayCountries