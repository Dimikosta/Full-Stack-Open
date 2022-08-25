import { useState } from 'react'

// finds the highest number in the array then uses index of to return the
// array index of the highest vote count
function findHighest (array) {
  let highest = Math.max(...array)
  return array.indexOf(highest)
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

  // Generates a 0 filled array the same length as anecdotes
  const points = new Uint8Array(anecdotes.length)
  
  // tracks the state setting the initial array to that of the generated array
  const[votes, setVotes] = useState(points)


  const handleClick = () => {
    // use math.floor to "round" down
    // randomly generated number is times by the array length which is + 1
    // from the 0 index so we get all possibilities
    let random = Math.floor(Math.random() * anecdotes.length)
    return setSelected(random)
  }

  const handleVoteClick = () => {
    // copy the array to not update the state and increase its vote
    const copy = [...votes]
    copy[selected] += 1;
    // Use state function to set it's new value to the copy thats been modified
    return setVotes(copy)
  }

  return (
    <div>
      <h1>Cool Anecdotes!</h1>
      {anecdotes[selected]}
      <div>
        <button onClick={handleVoteClick}>vote</button>
        <button onClick={handleClick}>next anecdote</button>
      </div>

      <h2>Highest voted Anecdote</h2>
      <div>
        {anecdotes[findHighest(votes)]}
        <p> is currently the highest with {Math.max(...votes)} votes</p>
      </div>
    </div>
  )
}

export default App