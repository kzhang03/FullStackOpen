import { useState } from 'react'

const Header = ( {name} ) => {
  return (
    <div>
      <h1><b>{name}</b></h1>
    </div>
  )
}

const Button = ( {name, handleClick} ) => {
  return (
    <div>
      <button onClick={handleClick}>{name}</button>
    </div>
  )
}

const DisplayFeedback = ( {alignment, counter} ) => {
  return (
    <div>
      <pre>{alignment} {counter}</pre>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    setGood(good => good + 1)
    setAll(all => all + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral => neutral + 1)
    setAll(all => all + 1)
  }

  const handleBad = () => {
    setBad(bad => bad + 1)
    setAll(all => all + 1)
  }

  const average = all !== 0 ? (good - bad) / all : 0; 
  const positivePercentage = all !== 0 ? (good / all) * 100 : 0;
  
  return (
    <div>
      <Header name="give feedback" />
      <Button handleClick={handleGood} name={"good"} />
      <Button handleClick={handleNeutral} name={"neutral"} />
      <Button handleClick={handleBad} name={"bad"} />
      <Header name="statistics" />
      <DisplayFeedback alignment={"good"} counter={good} />
      <DisplayFeedback alignment={"neutral"} counter={neutral} />
      <DisplayFeedback alignment={"bad"} counter={bad} />
      <DisplayFeedback alignment={"all"} counter={all} />
      <DisplayFeedback alignment={"average"} counter={average} />
      <DisplayFeedback alignment={"positive"} counter={positivePercentage + " %"} />
    </div>
  )
}

export default App