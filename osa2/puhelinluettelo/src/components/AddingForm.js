import React from 'react'

const AddingForm = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <form onSubmit={props.handleClick}>
        <table><tbody>
          <tr>
            <td>
              Nimi:
            </td><td>
              <input
                value={props.nameState}
                onChange={props.listenName}
              />
            </td>
          </tr>
          <tr>
            <td>
              Numero:
            </td><td>
              <input
                value={props.numberState}
                onChange={props.listenNumber}
              />
            </td>
          </tr>
        </tbody></table>
        <div>
          <button type="submit">lisää</button>
        </div>
        <Notification message={props.successMessageState}/>
      </form>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className="success">
      {message}
    </div>
  )
}

export default AddingForm
