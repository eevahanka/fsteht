import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  

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
    // console.log(persons)
      const copy = [...persons]
      const dict = {}
      dict['name'] = newName
      dict['number'] = newNumber
      copy.push(dict)
      setPersons(copy)
      setNewName('')
      setNewNumber('')
      // console.log(persons)
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