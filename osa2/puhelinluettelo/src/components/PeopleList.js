import React from 'react'

const PeopleList = (props) => {
  let peopleToShow = []

  if (props.filter === ''){
    peopleToShow = props.persons
  }
  else{
    peopleToShow = props.persons.filter(function(person){
      return person.name.toLowerCase().includes(props.filter.toLowerCase())
    })
}

  return (
    <div>
      <h2>{props.title}</h2>
      <table><tbody>
        {peopleToShow.map(
          person =>
          <tr key = {person.name}>
            <td>{person.name}</td>
            <td>{person.number}</td>
          </tr>)}
      </tbody></table>
    </div>
  )
}

export default PeopleList
