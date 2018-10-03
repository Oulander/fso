import React from 'react';
import AddingForm from './components/AddingForm'
import PeopleList from './components/PeopleList'
import FilterField from './components/FilterField'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    const namesArray = this.state.persons.map(person => person.name)
    const isNewName = namesArray.find((element) => element === newPerson.name) === undefined
    const fieldNotMissing = (this.state.newName.length > 0) && (this.state.newNumber.length > 0)

    if (isNewName && fieldNotMissing){
      const personsUpdated = this.state.persons.concat(newPerson)
      this.setState({
        persons: personsUpdated,
        newName: '',
        newNumber: ''
      })
    }
  }

  nameInputListener = (event) => {
    event.preventDefault()
    this.setState({newName: event.target.value})
  }

  numberInputListener = (event) => {
    event.preventDefault()
    this.setState({newNumber: event.target.value})
  }

  filterListener = (event) => {
    event.preventDefault()
    this.setState({filter: event.target.value})
  }

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <FilterField
          filter = {this.state.filter}
          listenFilter = {this.filterListener}

        />
        <AddingForm
          title = "Lisää uusi"
          handleClick = {this.addPerson}
          listenName = {this.nameInputListener}
          nameState = {this.state.newName}
          listenNumber = {this.numberInputListener}
          numberState = {this.state.newNumber}
        />
        <PeopleList
          title = "Numerot"
          persons = {this.state.persons}
          filter = {this.state.filter}
        />
      </div>
    )
  }
}


export default App
