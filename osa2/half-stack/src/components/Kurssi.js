import React from 'react'

const Kurssi = (props) => {
  return (
    <div>
      <Otsikko text={props.kurssi.nimi}/>
      <Sisalto osat={props.kurssi.osat}/>
      <Yhteensa osat={props.kurssi.osat}/>
    </div>
  )
}

const Otsikko = ({text}) => {
  return (
      <h1>{text}</h1>
    )
  }

const Sisalto = ({osat}) => {
  return (
    <div>
      {osat.map(osa => <Osa key={osa.id} osa={osa}/>)}
    </div>
  )
}

const Osa = ({osa}) => {
  return (
    <p>{osa.nimi} {osa.tehtavia}</p>
  )
}

const Yhteensa = ({osat}) => {
  const sumcounter = (acc, curr) => acc + curr.tehtavia
  const total_parts = osat.reduce(sumcounter, 0)
  return (
    <p>Yhteensä {total_parts} tehtävää</p>
  )
}

export default Kurssi
