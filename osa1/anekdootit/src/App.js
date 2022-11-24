import { useState } from 'react'

const Button = (probs) => {
  return(
    <button onClick={probs.handleCLick}>
      {probs.text}
    </button>
  )
}

const Best = (props) => {
  return(
  <div>
    <h2>
      Best anecdote
    </h2>
    <p>
      {props.ane}
    </p>
  </div>)
}

const Ane = (props) =>{
  return(
    <div>
      <p>
      {props.ane}
      </p>
      <p>
        has {props.points} votes
      </p> 
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setAll] = useState([0, 0, 0, 0, 0, 0, 0])
  const voteAne = () =>{
    const copy = [...votes]
    copy[selected] += 1
    setAll(copy)
  }
  const randomAne = () => {
    const numb = Math.floor(Math.random()*7)
    setSelected(numb)
  }
  const getBest = () => {
    let big = 0
    let best = 0
    for (let i = 0; i<7; i++){
      if (votes[i] > big){
        big = votes[i]
        best = i
      }
    }
    return  best
  }

  return (
    <div>
      <Ane ane={anecdotes[selected]} points={votes[selected]}/>
      <Button 
      handleCLick={randomAne}
      text='another anecdote'/>
      <Button 
      handleCLick={voteAne}
      text='vote'/>
      <Best ane={anecdotes[getBest()]}/>
    </div>
  )
}

export default App