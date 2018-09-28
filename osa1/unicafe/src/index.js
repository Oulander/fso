import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(){
    super()

    this.fb_classes = {

    }

    this.state = {
      good: {text: "Positive", value:0},
      neutral: {text: "Neutral", value:0},
      bad: {text: "Negative", value:0}
    }
  }



  render() {
    const castVote = (voteClass) => () => {
      this.setState({[voteClass]:
        {
        ...this.state[voteClass],
        value:this.state[voteClass].value + 1
        }
      })
    }

    const buttonValues = {}
    for (let value in this.state) {
      buttonValues[value] = {text: this.state[value].text, clickHandler: castVote(value)}
    }

    return (
      <div>
        <Feedback title="How was your experience?" classes={buttonValues}/>
        <Statistics title="Statistics" values={this.state}/>
      </div>
    )
  }
}

const Feedback = (props) => {
  const buttons = []
  for (let fb in props.classes) {
    buttons.push(<Button key={props.classes[fb].text} text={props.classes[fb].text} clickHandler={props.classes[fb].clickHandler} />)
      }

  return (
    <div>
      <h1>{props.title}</h1>
      {buttons}
    </div>
    )
  }

  const Button = (props) => {
    return (
      <button onClick={props.clickHandler}>{props.text}</button>
    )
  }

const Statistics = (props) => {
  const stats = []
  const all_values = {}
  for (let stat in props.values) {
    all_values[stat] = props.values[stat].value
    stats.push(<Statistic key={props.values[stat].text} name={props.values[stat].text} value={props.values[stat].value} />)
      }

  const total_votes = all_values.good + all_values.neutral + all_values.bad
  const average = (all_values.good + -1 * all_values.bad) / total_votes
  const pct_positive = ((all_values.good / total_votes) * 100).toFixed(1) + ' %'

  stats.push(<Statistic key="average" name="Average" value={average.toPrecision(2)}/>)
  stats.push(<Statistic key="pct_positive" name="% positive" value={pct_positive}/>)

  if (total_votes === 0) {
    return(
      <div>
        <h2>{props.title}</h2>
        <p>No feedback given yet.</p></div>
    )
  }
  return (
    <div>
      <h2>{props.title}</h2>
      <table><tbody>{stats}</tbody></table>
    </div>
  )
}

const Statistic = (props) => {
  return (
    <tr><td>{props.name}</td><td>{props.value}</td></tr>
  )
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
