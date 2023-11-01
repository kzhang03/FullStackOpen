import { useState } from 'react'

const Title = ({ title }) => {
  return (
    <h1>
      {title}
    </h1>
  )
}

const Button = ({ title, handler}) => {
  return (
    <button onClick={handler}>
      {title} 
    </button>
  )
}

const Statistic = ({ name,val}) => {
  return (
    <div>
      {name} {val}
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => {
    setGood(good + 1)
  }

  const increaseNeutral = () => {
    setNeutral(neutral + 1)
  }

  const increaseBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Title title="give feedback" />
      <Button title="good" handler={increaseGood}/>
      <Button title="neutral" handler={increaseNeutral}/>
      <Button title="bad" handler={increaseBad}/>
      <Title title="statistics" />
      <Statistic name="good" val={good} />
      <Statistic name="neutral" val={neutral} />
      <Statistic name="bad" val={bad} />
    </div>
  )
}

export default App