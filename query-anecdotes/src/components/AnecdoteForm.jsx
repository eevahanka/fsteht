import { createAnecdote } from "../request"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotification } from '../notificationContext.jsx'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [ , notificationDispatch ] = useNotification()
  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
  onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  onError: (error) => {
      const message = error.response.data.error
      notificationDispatch({ type: 'SET', payload: message })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR' })
      }, 5000)
      
    }
  }
  )


  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({ type: 'SET', payload: `You created '${content}'` })
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
