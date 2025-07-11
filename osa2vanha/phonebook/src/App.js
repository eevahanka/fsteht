import { useState } from 'react'

const Persons = (props) => {
  return(
    <div>
      <h2>
        Numbers
      </h2>
      {props.persons.map((person, i) =>
      <div key={i}>
        {person['name']}: {person['number']}</div>)}
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

const App = () => {
  const [persons, setPersons] = useState([
    
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const handleNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

// JSON.stringify(a) === JSON.stringify(b))

  const check = (newname) => {
    for (let i = 0; i< persons.length ; i++){
      if (JSON.stringify(persons[i]['name']) === JSON.stringify(newname)){
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
      const copy = [...persons]
      const dict = {}
      dict['name'] = newName
      dict['number'] = newNumber
      copy.push(dict)
      setPersons(copy)
      setNewName('')
      setNewNumber('')}
  }
  return (
    <div>
      <h1>Phonebook</h1>
        <div>
          <Add addPersons={addPersons} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
        </div>
      <Persons persons={persons}/>
    </div>
  )
}

export default App