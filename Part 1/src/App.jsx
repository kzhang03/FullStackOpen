import { useState } from 'react'

const Title = ({ title }) => {
  return <h1>{title}</h1>
}

const Button = ({ title, handler }) => {
  return <button onClick={handler}>{title}</button>
};

const Statistic = ({ stats }) => {
  const totalFeedback = stats.good + stats.neutral + stats.bad

  if (totalFeedback === 0) return <div>No feedback given</div>
  
  return (
    <div>
      {Object.entries(stats).map(([key, value]) => (
        <div>
          {key} {value}
        </div>
      ))}
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

  const statistics = {
    good,
    neutral,
    bad,
    all: totalFeedback,
    average: average.toFixed(2),
    positive: positive.toFixed(2) + '%',
  }

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