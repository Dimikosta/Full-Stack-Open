import { useState } from 'react'

const Button = ({ text, clickHandler }) => {
  console.log('Clicked')
  return <button onClick={clickHandler}>{text}</button>
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

// Displays headers
const Header = ({ text }) => {
  return <h1>{text}</h1>
}

const Statistics = ({ good, bad, neutral } ) => {
  
  let total = (good + bad + neutral)
  let average = (good - bad) / total
  let percentPositive = Math.round((good / total) * 100) + '%'

  if (good === 0 && neutral === 0 && bad ===0) {
    return (
      <div>
        No feedback given
      </div>
    ) 
  } else {
    return (
        <table>
          <StatisticLine text={"Good"} value={good} />
          <StatisticLine text={"Neutral"} value={neutral} />
          <StatisticLine text={"Bad"} value={bad} />
          <StatisticLine text={"Total"} value={total} />
          <StatisticLine text={"Average"} value={average.toFixed(2)} />
          <StatisticLine text={"Positive"} value={percentPositive} />

        </table>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <Header text='Give Feedback' />
      <Button text={"Good"} clickHandler={handleGoodClick}/>
      <Button text={"Neutral"} clickHandler={handleNeutralClick} />
      <Button text={"Bad"} clickHandler={handleBadClick} />
      
      <Header text='Statistics' />
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App