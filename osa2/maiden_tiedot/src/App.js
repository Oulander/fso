import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      userInput: '',
      filter: ''
    }
  }

  componentDidMount() {
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      this.setState({ countries: response.data })
    })
}

  setInput = (event) => {
    event.preventDefault()
    this.setState({userInput: event.target.value})
  }



  chooseSingleCountry = (country) => (event) => {
    event.preventDefault()
    this.setState({userInput: country.name})
  }


  render() {
    return (
    <div>
      Find countries <FilterField userInput={this.state.userInput} setInput={this.setInput} />
      <CountryView countries={this.state.countries} filter={this.state.userInput} clickCountry={this.chooseSingleCountry}/>
    </div>
    )
  }
}

const FilterField = (props) => {
  return (
    <div>
      <input
        value={props.userInput}
        onChange={props.setInput}
      />
    </div>
  )
}

const CountryView = (props) => {
  let countriesToShow = props.countries
  const limit = 10

  if (props.filter.length > 0) {
    countriesToShow = props.countries.filter(
      function(country){
        return country.name.toLowerCase().includes(props.filter.toLowerCase())
      })
  }
  else {
    return(
      <div>Type stuff to filter countries!</div>
    )
  }

  if (countriesToShow.length > limit){
    return (
      <div>More than {limit} mathces, type in some more filter stuffz</div>
    )
  }
  else if (countriesToShow.length === 1){
    const country = countriesToShow[0]
    return(
      <div>
        <h2>{country.name}</h2>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <img src={country.flag} width="400" alt={"Flag of " + country.name}/>
      </div>
    )
  }
  else{
    return (
      <div>
        {countriesToShow.map(country => <div
          key={country.name}
          onClick={props.clickCountry(country)}>{country.name}<br/></div>)}
      </div>
    )
  }
}

export default App;
