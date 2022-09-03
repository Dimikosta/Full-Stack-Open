import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const duplicate = (persons) => {
    return persons.some(person => newName === person.name)
  }

  //Handlers for all inputs
  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
      setNewNumber(event.target.value)
    }

  const handleSearch = (event) => {
      setSearch(event.target.value.toLowerCase())
    }

  // Handles the click to add a new person to the phonebook
  const handleClick = (event) => {
    event.preventDefault()
    if (duplicate(persons)) {
      return alert(`${newName} is already in the PhoneBook`)
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const Filter = (props) => {
    const results = props.persons.filter((person, index) => {
      return person.name.toLowerCase().includes(search)
    })
    return <DisplayNumbers persons={results} />
  }


const DisplayNumbers = (props) => {
  return props.persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)
}

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter people <input onChange={handleSearch}></input></div>
      <h3>Add a New Entry</h3>
      <form>
        <div>name: <input onChange={handleName}/> </div>
        <div>number: <input onChange={handleNumber}/> </div>
        <div>
          <button type="submit" onClick={handleClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Filter persons={persons} />
      <div>
        Debug: {search}
      </div>
    </div>
  )
}

export default App