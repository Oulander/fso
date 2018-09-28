import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      anecdotes: {},
      anecdoteCount: 0
    }
    for (let i = 0; i<props.anecdotes.length; i++){
      this.state.anecdotes[i] = {text: props.anecdotes[i], votes: 0}
      this.state.anecdoteCount += 1
    }

    this.state.selected = Math.floor(Math.random()*this.state.anecdoteCount)
  }

  render() {

    const nextAnecdote = () => () => {
      this.setState({selected: Math.floor(Math.random()*this.state.anecdoteCount) })
    }

    const castVote = (selected) => () => {
      this.setState({anecdotes:{
          ...this.state.anecdotes,
          [this.state.selected]: {...this.state.anecdotes[this.state.selected], votes: this.state.anecdotes[this.state.selected].votes + 1}
        }
      })
    }

    const buttons = {}
    buttons["vote"] = {text: "Vote", handleClick: castVote(this.state.selected)}
    buttons["next"] = {text: "Next anecdote", handleClick: nextAnecdote()}

    return (
      <div>
        <AnecdoteArea title="Anecdote of the day" anecdote={this.state.anecdotes[this.state.selected]} selected={this.state.selected} buttons={buttons}/>
        <StatisticsArea title="Anecdote(s) with most votes" anecdotes={this.state.anecdotes}/>
      </div>
    )
  }
}

const AnecdoteArea = (props) => {
  const buttons = []
  for (let buttonIndex in props.buttons) {
    buttons.push(<Button key={props.buttons[buttonIndex].text} text={props.buttons[buttonIndex].text} handleClick={props.buttons[buttonIndex].handleClick} />)

      }
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.anecdote.text}</p>
      <p>Has {props.anecdote.votes} votes.</p>
      {buttons}
    </div>
    )
    }

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticsArea = (props) => {
  const anecdotes = props.anecdotes
  let mostVotedAnecdotes = []

  for (let anecdoteIndex in anecdotes) {
    if (anecdotes[anecdoteIndex].votes === 0){

      continue
    }
    if (mostVotedAnecdotes.length === 0) {
      mostVotedAnecdotes.push(anecdotes[anecdoteIndex])
    } else if (anecdotes[anecdoteIndex].votes === mostVotedAnecdotes[0].votes){
      mostVotedAnecdotes.push(anecdotes[anecdoteIndex])
    }
      else if (anecdotes[anecdoteIndex].votes > mostVotedAnecdotes[0].votes){
      mostVotedAnecdotes = [anecdotes[anecdoteIndex]]
    }
  }

  const anecdotesToShow = []
  for (let anecdoteIndex in mostVotedAnecdotes) {
    anecdotesToShow.push(<StatisticsAnecdote key={anecdoteIndex} text={mostVotedAnecdotes[anecdoteIndex].text} votes={mostVotedAnecdotes[anecdoteIndex].votes} />)
  }

  return (
    <div>
      <h2>{props.title}</h2>
      <div>{anecdotesToShow}</div>
    </div>
  )
}

const StatisticsAnecdote = (props) => {
  return (
    <p>"{props.text}"<br/>(has {props.votes} votes)</p>

  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
