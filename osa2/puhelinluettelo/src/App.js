import React from 'react';
import AddingForm from './components/AddingForm'
import PeopleList from './components/PeopleList'
import FilterField from './components/FilterField'
import NumberService from './services/Numbers'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      successMessage: null
    }
  }

  componentDidMount() {
    NumberService.getAll()
      .then(response => {
        this.setState({ persons: response })
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    const personDetailsFromArray = this.state.persons.find((person) => person.name === newPerson.name)
    const isNewPerson = personDetailsFromArray === undefined
    const fieldNotMissing = (this.state.newName.length > 0) && (this.state.newNumber.length > 0)

    if (fieldNotMissing){
      if (isNewPerson){
        NumberService
          .create(newPerson)
          .then(response => {
          this.setState({
            persons: this.state.persons.concat(response),
            newName: '',
            newNumber: ''
          })
        })
        this.setSuccessMessage(newPerson.name +  " lisättiin luetteloon.")
      }
      else {
        const id = personDetailsFromArray.id
        const name = personDetailsFromArray.name
        const newNumber = newPerson.number
        this.updateNumber({id:id, name:name, newNumber:newNumber})


      }
    }
  }

  updateNumber = (props) => {
    const id = props.id
    const name = props.name
    const newNumber = props.newNumber
    const newPerson = {name: name, number: newNumber}

    NumberService
      .update(id, newPerson)
      .then(updatedNumber => {
        const personsFiltered = this.state.persons.filter(person => person.id !== id)
        const updatedPerson = {
          name: name,
          number: newNumber,
          id: id
        }
        this.setState({
          persons: personsFiltered.concat(updatedPerson),
          newName: '',
          newNumber: ''
        })
        this.setSuccessMessage("Henkilön " + name +  " numero päivitetty.")
      })
      .catch(error => {
        NumberService.getAll()
          .then(response => {
            this.setState({ persons: response })
          })
        NumberService.create(newPerson)
          .then(response => {
          this.setState({
            persons: this.state.persons.concat(response),
            newName: '',
            newNumber: ''
          })
        this.setSuccessMessage("Henkilön " + name +  " tiedot on poistettu jonkun muun toimesta ennen tekemääsi muutosta. Luotiin henkilö uudelleen puhelinluetteloon.")
        })
      })
  }

  setSuccessMessage = (message) => {
    this.setState({successMessage: message})

  setTimeout(() => {
    this.setState({successMessage: null})
  }, 5000)
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

  deletePerson = (person) => (event) => {
    event.preventDefault()
    if(window.confirm("Haluatko varmasti poistaa numeron?")){
      NumberService.remove(person.id)
      let persons = this.state.persons
      const index = persons.indexOf(person)
      persons.splice(index, 1)
      this.setState({persons: persons})
      this.setSuccessMessage(person.name + " poistettiin luettelosta")
    }
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
          successMessageState = {this.state.successMessage}
        />
        <PeopleList
          title = "Numerot"
          persons = {this.state.persons}
          filter = {this.state.filter}
          handleDeleteClick = {this.deletePerson}
        />
      </div>
    )
  }
}


export default App
