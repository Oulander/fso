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
      </form>
    </div>
  )
}

export default AddingForm
