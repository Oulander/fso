import React from 'react'

const FilterField = (props) => {
  return (
    <div>
      Rajaa näytettäviä: <input
        value={props.filter}
        onChange={props.listenFilter}
      />
    </div>
  )
}

export default FilterField
