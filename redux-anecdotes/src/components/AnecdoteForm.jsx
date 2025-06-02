import { useDispatch } from "react-redux"
import { createAne } from "../reducers/anecdoteReducer"
import { setNotification, clearNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAne = async (event) => {
        event.preventDefault()
        const content = event.target.Anecdote.value
        event.target.Anecdote.value = ''
        const newAne = await anecdoteService.createNew(content)
        dispatch(createAne(newAne))
        dispatch(setNotification(`You added '${content}'`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    return (
        <form onSubmit={addAne}>
            <input name="Anecdote" />
            <button type="submit">add</button>
        </form>
    )
}
export default AnecdoteForm