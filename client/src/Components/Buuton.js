import React from 'react'

export default function Buuton({name, onSalvar}) {
  const handleActionClick = (event) =>{
    onSalvar()
  }
  return (
    <div className="col s3">
      <a 
      href=""
      className="waves-effect waves-light btn"
      onClick={handleActionClick} id={'any'} 
      type="add"
      >{name}</a>

    </div>
  )
}
