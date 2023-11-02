import { useState } from 'react'

const Title = ({ title }) => {
  return <h1>{title}</h1>
}

const Button = ({ name, handler }) => {
  return <button onClick={handler}>{name}</button>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(8).fill(0))
  const maxVotes = Math.max(...votes)
  const indexOfMax = votes.indexOf(maxVotes)

  const nextAnecdote = () => {
    setSelected((selected + 1) % anecdotes.length)
  }

  const increaseVote = () => {
    const newVotes = [...votes]
    newVotes[selected] = newVotes[selected] + 1
    setVotes(newVotes)
  }

  return (
    <div>
      <Title title="Anecdote of the day" />
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Button name="vote" handler={increaseVote} />
      <Button name="next anecdote" handler={nextAnecdote} />
      <Title title="Anecdote with the most votes" />
      <div>{anecdotes[indexOfMax]}</div>
      <div>has {votes[indexOfMax]} votes</div>
    </div>
  )
}

export default App