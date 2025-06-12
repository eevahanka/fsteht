import personService from './services/puhelinluettelo.js'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notif'>
      {message}
    </div>
  )
}

const Filter = (props) => {
return(
  <div>
    <form>
      filter on string: <input value={props.newFilter} onChange={props.handleFilterChange}/>
    </form>
  </div>)
}

const Person = ({ person, handleDelete }) => {
  return(
    <div>
      {person['name']}: {person['number']} 
      <button onClick={handleDelete}>delete</button>
    </div>
  )
}

const Persons = (props) => {
  const filtered = props.persons.filter((person) => person.name.toLowerCase().includes(props.filter.toLowerCase()))
  return(
    <div>
      <h2>Numbers</h2>
      {filtered.map((person, i) =>
      <div key={i}>
        <Person person={person} handleDelete={() => props.handleDelete(person.id)}/>
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
  const [notification, setNOtification] = useState(null)
  
  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
  }

  const toggleDeleteOf = (id) => {
    const persontodelete = persons.find(person => person.id === id)
    if (window.confirm("Delete " + persontodelete.name + "?")) {
      personService.del(id)
      .then(response => {
          setPersons(persons.filter((person) => person.id !== id ))
        } )
    }
  }

  const check = (newname) => {
    for (let i = 0; i< persons.length ; i++){
      if (JSON.stringify(persons[i]['name']) === JSON.stringify(newname)){
        return false
      }
    }
    return true
  }

  const editNumber = (newName, newNumber) => {
    if (window.confirm("edit " + newName + "'s number")) {
      const person = persons.find(person => person.name === newName)
      const editedperson = { ...person, number: newNumber }
      personService
      .update(editedperson.id, editedperson)
      .then(
        response => {
          setPersons(persons.filter((person) => person.id !== editedperson.id ).concat(response.data))
        }
      )
      .catch(error => {
        setNOtification(
          `${newName} does not exist...`
        )
        setTimeout(() => {
          setNOtification(null)
        }, 5000)
      })
    }
  }

  const addPersons = (event) => {
    event.preventDefault()
    if (check(newName)){
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        })
        .catch(error => {
          setNOtification(
            error.response.data.error
          )

        })
        setNOtification(
          `added '${newName}`
        )
        setTimeout(() => {
          setNOtification(null)
        }, 5000)  
        setNewName('')
        setNewNumber('')
      
    }
    else {
      editNumber(newName, newNumber)
      setNewName('')
      setNewNumber('')


    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <Notification message={notification} />
      </div>
      <div>
        <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      </div>
      <div>
          <Add addPersons={addPersons} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
        </div>
      
      <Persons persons={persons}
      filter={newFilter}
      handleDelete={toggleDeleteOf}
      />
    </div>
  )
}

export default App