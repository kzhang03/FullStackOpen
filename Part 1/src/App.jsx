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

const Statistic = ({ name, val}) => {
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
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const increaseGood = () => {
    const newGood = good + 1
    const newAll = all + 1
    setGood(newGood)
    setAll(newAll)
    setAverage((newGood - bad) / newAll)
    setPositive((newGood / newAll) * 100)
  }
  
  const increaseNeutral = () => {
    const newAll = all + 1
    setNeutral(neutral + 1)
    setAll(newAll)
    setPositive((good / newAll) * 100)
  }
  
  const increaseBad = () => {
    const newBad = bad + 1
    const newAll = all + 1
    setBad(newBad)
    setAll(newAll)
    setAverage((good - newBad) / newAll)
    setPositive((good / newAll) * 100)
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
      <Statistic name="all" val={all} />
      <Statistic name="average" val={average} />
      <Statistic name="positive" val={positive} />
    </div>
  )
}

export default App