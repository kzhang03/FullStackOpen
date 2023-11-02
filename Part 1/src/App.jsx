import { useState } from 'react'

const Title = ({ title }) => {
  return <h1>{title}</h1>
}

const Button = ({ title, handler }) => {
  return <button onClick={handler}>{title}</button>
}

const StatisticLine = ({ text, value }) => {
  return <div>{text} {value}</div>
}

const Statistic = ({ stats }) => {
  const totalFeedback = stats[3]

  if (totalFeedback === 0) return <div>No feedback given</div>
  
  return (
    <div>
      <StatisticLine text="good" value={stats[0]} />
      <StatisticLine text="neutral" value={stats[1]} />
      <StatisticLine text="bad" value={stats[2]} />
      <StatisticLine text="all" value={totalFeedback} />
      <StatisticLine text="average" value={stats[4]} />
      <StatisticLine text="positive" value={stats[5]} />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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

  const statistics = [good, neutral, bad, totalFeedback, average, positive]

  return (
    <div>
      <Title title="give feedback" />
      <Button title="good" handler={increaseGood} />
      <Button title="neutral" handler={increaseNeutral} />
      <Button title="bad" handler={increaseBad} />
      <Title title="statistics" />
      <Statistic stats={statistics} />
    </div>
  );
};

export default App;
