import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { use } from "react"
import { setNotification, clearNotification } from "../reducers/notificationReducer"

const Ane = ({ anecdote, handleClick }) => {
    return (
        <div>
        <div>{anecdote.content}</div>
        <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
        </div>
        </div>
    )
    }




const AnecdoteList = () => {
    const dispatch = useDispatch()
    const handleVote = (ane) => {
        dispatch(addVote(ane.id))
        dispatch(setNotification(`You voted '${ane.content}'`))
        setTimeout(() => {
        dispatch(clearNotification())
        }, 5000)
    }
    const anes = useSelector(state => state.anes)
    const filter = useSelector(state => state.filter)
    if (filter){
        return (
        <div>
            {anes
            .filter(ane => ane.content.toLowerCase().includes(filter.toLowerCase()))
            .slice()
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
                <Ane 
                    key={anecdote.id} 
                    anecdote={anecdote} 
                    handleClick={() => handleVote(anecdote)} 
                />
            )}
        </div>)
    }
    return (
        <div>
            {anes
            .slice()
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
                <Ane 
                    key={anecdote.id} 
                    anecdote={anecdote} 
                    handleClick={() => handleVote(anecdote)} 
                />
            )}
        </div>
    )
}

export default AnecdoteList