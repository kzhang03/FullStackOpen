import React from 'react'

const SearchCountries = ({ newSearch, filterCountry }) => {
    return (
      <form>
        <div>
          find countries <input value={newSearch} onChange={filterCountry} />
        </div>
      </form>
    )
}

export default SearchCountries