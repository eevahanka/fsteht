import { useDispatch } from "react-redux"
import { createNewAne } from "../reducers/anecdoteReducer"
import { notif } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAne = async (event) => {
        event.preventDefault()
        const content = event.target.Anecdote.value
        event.target.Anecdote.value = ''
        dispatch(createNewAne(content))
        dispatch(notif(`You added '${content}'`, 5))
    }

    return (
        <form onSubmit={addAne}>
            <input name="Anecdote" />
            <button type="submit">add</button>
        </form>
    )
}
export default AnecdoteForm