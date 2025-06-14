import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const aneSlice = createSlice({
  name: 'aneReducer',
  initialState: [],
  reducers: {
    voteAne(state, action) {
      const id = action.payload.id
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAne = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAne
      )
    },
    createAne(state, action) {
      const content = action.payload
      state.push(action.payload)
    },
    setAnes(state, action) {
      return action.payload
    }
  }
})

export const { voteAne, createAne, setAnes } = aneSlice.actions

export const initializeAnes = () => {
  return async dispatch => {
    const anes = await anecdoteService.getAll()
    dispatch(setAnes(anes))
  }
}

export const createNewAne = content => {
  return async dispatch => {
    const newAne = await anecdoteService.createNew(content)
    dispatch(createAne(newAne))
  }
}

export const addVote = id => {
  return async dispatch => {
    const updatedAne = await anecdoteService.addVote(id)
    dispatch(voteAne(updatedAne))
  }
}

export default aneSlice.reducer
