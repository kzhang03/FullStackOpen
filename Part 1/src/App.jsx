import { useState } from 'react'

<<<<<<< Updated upstream
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
=======
const Title = ({ title }) => {
  return <h1>{title}</h1>
}

const Button = ({ title, handler }) => {
  return <button onClick={handler}>{title}</button>
}

const StatisticLine = ({ text, value}) => {
  return <div>{text} {value}</div>
}

const Statistic = ({ stats }) => {
  const totalFeedback = stats[0] + stats[1] + stats[2]

  if (totalFeedback === 0) return <div>No feedback given</div>
  
  return (
    <div>
      <StatisticLine text="good" value={stats[0]} />
      <StatisticLine text="neutral" value={stats[1]} />
      <StatisticLine text="bad" value={stats[2]} />
      <StatisticLine text="all" value={stats[3]} />
      <StatisticLine text="average" value={stats[4]} />
      <StatisticLine text="positive" value={stats[5]} />
>>>>>>> Stashed changes
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

<<<<<<< Updated upstream
  const handleGood = () => {
    setGood(good => good + 1)
    setAll(all => all + 1)
  }
=======
  const increaseGood = () => {
    setGood(good + 1)
  };

  const increaseNeutral = () => {
    setNeutral(neutral + 1)
  };

  const increaseBad = () => {
    setBad(bad + 1)
  };

  const totalFeedback = good + neutral + bad
  const average = totalFeedback ? (good - bad) / totalFeedback : 0
  const positive = totalFeedback ? (good / totalFeedback) * 100 : 0

  const statistics = [good,
                      neutral,
                      bad,
                      totalFeedback,
                      average,
                      positive]
>>>>>>> Stashed changes

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