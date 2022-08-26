import { useState } from 'react'
import AddPerson from './components/AddPerson'
import DisplayPhonebook from './components/DisplayPhonebook'
import SearchFilter from './components/SearchFilter'

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const dupeChecker = (persons) => {
    return persons.some((person) => newName === person.name)
  }

  // When a user clicks the button we create a new phone intry
  const handleClick = (event) => {
    // prevents normal HTML button behavior
    event.preventDefault()
    // just some checks to stop people entering bad data
    if (newName === '') {
      return alert(`Please enter a name`)
    }
    if (newNumber === '') {
      return alert(`Please enter a number`)
    }
    // uses function to check for a duplicate
    if (dupeChecker(persons)) {
      return alert(`${newName} is already in the phonebook!`)
    }
    // creates a new object to enter into the phonebook
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }


  // Functions for handle input events
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    setSearch(event.target.value)
  }

  const searchFilter = ( persons ) => {
    if (search === '') {
      return persons
    }
    const filtered = persons.filter((person, index) => person.name.toLowerCase().includes(search.toLowerCase()))
    return filtered;
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          Find someone: <input 
                        
                        onChange={handleFilter}
                        />
        </div>
      <h2>Add a new Entry</h2>
      {/* <AddPerson props={props} /> */}
      <form>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange}
                  />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit" onClick={handleClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <DisplayPhonebook people={searchFilter(persons)} />
      </div>   
    </div>
  )
}

export default App

