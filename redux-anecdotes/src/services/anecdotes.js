import axios from 'axios'
const baseurl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseurl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseurl, object)
  return response.data
}

const addVote = async (id) => {
  const anecdote = await axios.get(`${baseurl}/${id}`)
  const response = await axios.patch(`${baseurl}/${id}`, { votes: anecdote.data.votes + 1 })
  return response.data
}

export default { getAll, createNew, addVote }