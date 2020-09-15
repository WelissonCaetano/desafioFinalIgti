import React from 'react'

export default function Filtro({id, value, label, onChangeFilter}) {
  const HandleFilterChange = (event) =>{
    onChangeFilter(event.target.value)
    // console.log(event.target.value)
  }
  return (
    <div className="input-field col s9">
    <input value={value} id={id} type="text" className="validate" onChange={HandleFilterChange}></input>
    <label className="active" htmlFor={id}>{label}</label>
  </div>
  )
}
