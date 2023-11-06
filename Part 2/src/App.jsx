import { useState } from 'react'

const DisplayNames = ({ persons, keyword }) => {
  const filteredPersons = keyword === '' ? persons : persons.filter(person =>
    person.name.toLowerCase().includes(keyword.toLowerCase())
  )
  return (
    filteredPersons.map((person, i) => <div key={i}>{person.name} {person.number}</div>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addNumber = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    const isDuplicate = persons.some(person => person.name === newPerson.name)
    if (isDuplicate) {
      alert(`${newPerson.name} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(newPerson)) 
    }
    setNewName('')
    setNewNumber('')
  }

  const nameChange = (event) => {
    setNewName(event.target.value)
  }

  const numberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const filterName = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>filter shown with <input value={newSearch} onChange={filterName}/></div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addNumber}>
        <div> name: <input value={newName} onChange={nameChange}/> </div>
        <div> number: <input value={newNumber} onChange={numberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <DisplayNames persons={persons} keyword={newSearch}/>
    </div>
  )
}

export default App