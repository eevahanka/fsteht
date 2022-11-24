import { useState } from 'react'

const Header = (props) =>{
  return (
    <div>
      <h2>
        {props.header}
      </h2>
    </div>
  )
}

const Button = (probs) => {
  return(
    <button onClick={probs.handleCLick}>
      {probs.text}
    </button>
  )
}

const StatisticLine = (probs) =>{
  return(
    <tr>
      <td>
        {probs.text}
      </td>
      <td>
      {probs.value} 
      </td>
    </tr>
     
      
  )
}

const Statistic = (probs) =>{
  const goods = probs.stats[0]
  const neuts = probs.stats[1]
  const bads = probs.stats[2]
  const totalvotes = goods + bads + neuts
  if (totalvotes > 0){
  return (
  <div>
    <h2>
        Statistic
      </h2>
      
      <table>
        
        <StatisticLine text='good' value={goods}/>
        <StatisticLine text='neutral' value={neuts}/>
        <StatisticLine text='bad' value={bads}/>
        <StatisticLine text='avg' value={(goods -bads) /totalvotes}/>
        <StatisticLine text='pos' value={goods/totalvotes *100}/> 
        
      </table>
      
        
      
      </div>)
    
  }
  else{
    return(
      <div>
        <h2>
        Statistic
      </h2>
        <p>
          No feedback given
        </p>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const header = 'give feedback'
  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <Header header={header}/>
      <Button 
        handleCLick={increaseGood}
        text='good'/>
        <Button 
        handleCLick={increaseNeutral}
        text='neutral'/>
        <Button 
        handleCLick={increaseBad}
        text='bad'/>
      <Statistic stats={[good, neutral, bad]}/>
    </div>
  )
}

export default App