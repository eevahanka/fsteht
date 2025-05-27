import {voteAne, createAne} from './reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)  

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAne(id))
  }
  const addAne = (event) => {
    event.preventDefault()
    const content = event.target.Anecdote.value
    event.target.Anecdote.value = ''    
    dispatch(createAne(content))  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
      .slice()
      .sort((a, b) => b.votes - a.votes)
      .map(anecdote =>
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