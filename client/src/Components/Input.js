import React from 'react'

export default function Input({id,value, label}) {
  return (
      <div className="input-field col s3">
      <input value={value} id={id} type="text" className="validate" readOnly></input>
      <label className="active" htmlFor={id}>{label}</label>
    </div>
  )
}
