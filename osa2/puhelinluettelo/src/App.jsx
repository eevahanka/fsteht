import noteService from './services/puhelinluettelo.js'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {
return(
  <div>
    <form>
      filter on string: <input value={props.newFilter} onChange={props.handleFilterChange}/>
    </form>
  </div>)
}

const Person = (props) => {
  return(
    <div>
      {props.person['name']}: {props.person['number']}
    </div>
  )
}

const Persons = (props) => {
  // console.log(props.persons)
  const filtered = props.persons.filter((person) => person.name.toLowerCase().includes(props.filter.toLowerCase()))
  // console.log(filtered);
  return(
    <div>
      <h2>Numbers</h2>
      {filtered.map((person, i) =>
      <div key={i}>
        <Person person={person}/>
        </div>)} 
      </div>   
  )
}

const Add = (props) => {
  return(
    <div>
      <h2>
        add new
      </h2>
      <form onSubmit={props.addPersons}>
          nimi: <input value={props.newName} onChange={props.handleNameChange}/>
          <br></br>
          numero: <input value={props.newNumber} onChange={props.handleNumberChange}/>
          <button type="submit">save</button>
        </form> 
    </div>
  )
}

const App = (props) => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  useEffect(() => {
    // console.log('effect')
    noteService
      .getAll()
      .then(response => {
        // console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  const handleNameChange = (event) => {
    event.preventDefault()
    // console.log("persons")
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
    // console.log("im here boss");
  }

  const check = (newname) => {
    // console.log('here')
    for (let i = 0; i< persons.length ; i++){
      if (JSON.stringify(persons[i]['name']) === JSON.stringify(newname)){
        // console.log(1245)
        alert(`${newName} is already added to phonebook`)
        setNewName('')
        return false
      }
    }
    return true
  }

  const addPersons = (event) => {
    event.preventDefault()
    if (check(newName)){
      const personObject = {
        name: newName,
        number: newNumber,
      }
      noteService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')})
          }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      </div>
      <div>
          <Add addPersons={addPersons} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
        </div>
      
      <Persons persons={persons} filter={newFilter}/>
    </div>
  )

}

export default App