import { useDispatch, useSelector } from "react-redux"
import { voteAne } from "../reducers/anecdoteReducer"
import { use } from "react"

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
    const anes = useSelector(state => state)

    return (
        <div>
            {anes
            .slice()
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
                <Ane 
                    key={anecdote.id} 
                    anecdote={anecdote} 
                    handleClick={() => dispatch(voteAne(anecdote.id))} 
                />
            )}
        </div>
    )}

export default AnecdoteList