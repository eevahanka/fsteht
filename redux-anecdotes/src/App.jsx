import { useSelector, useDispatch } from 'react-redux'

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({
      type: 'VOTE',
      payload: id
    })
  }
  const addAne = (event) => {
    event.preventDefault()
    const content = event.target.Anecdote.value
    event.target.Anecdote.value = ''    
    dispatch({      
      type: 'NEW_ANE',      
      payload: {        
        content,        
        votes: 0,        
        id: generateId()      }    })  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAne}>
        <input name="Anecdote" />         
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default App