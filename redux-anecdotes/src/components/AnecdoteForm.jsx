import { useDispatch } from "react-redux"
import { createAne } from "../reducers/anecdoteReducer"
import { setNotification, clearNotification } from "../reducers/notificationReducer"


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAne = (event) => {
        event.preventDefault()
        const content = event.target.Anecdote.value
        event.target.Anecdote.value = ''
        dispatch(createAne(content))
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