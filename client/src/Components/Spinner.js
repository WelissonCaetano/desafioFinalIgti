import React from 'react'

export default function Spinner() {
  return (
    <div style={style.flexRow}>
      <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      <span>Aquarde...</span>
    </div>
  )
}

const style = {
  flexRow :{
    display: 'flex',
    flexDirection: 'row',
    alignItens: 'center',
    justifyContent: 'center'
  }
}