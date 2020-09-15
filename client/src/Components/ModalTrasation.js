import React, { useEffect, useState } from 'react'

import Modal from 'react-modal'

Modal.setAppElement('#root');

export default function ModalTrasation({onSave, onClose, selectedTrasation, openModal, d}) {
  const t = (parseInt(d.getMonth())+1).length
  const mes = (t === 1 ? (parseInt(d.getMonth())+1) : '0'+(parseInt(d.getMonth())+1) )
 
  const { day, description, value, category, year, month, yearMonth, yearMonthDay, type } = selectedTrasation;

  const [fdescription , SetFDescription] = useState(!description ? '' : description);
  const [fvalue , SetFValue] = useState(!value ? 0 : value);
  const [fcategory , SetFCategory] = useState(!category ? '' : category);
  const [fyear , SetFyear] = useState(!year ? d.getFullYear() : year);
  const [fmonth , SetFMonth] = useState(!month ? d.getMonth()+1 : month);
  const [fday , SetFDay] = useState(!day ? d.getDate() : day);
  const [fyearMonth , SetFYearMonth] = useState(!yearMonth ? d.getFullYear()+"-"+mes : yearMonth);
  const [fyearMonthDay , SetFYearMonthDay] = useState(!yearMonthDay ? d.getFullYear()+"-"+mes+"-"+d.getDate() : yearMonthDay);
  const [ftype , SetFType] = useState(!type ? '0' : type);

  const handleClickBotton =() =>{
    const boby = []
    
    const newTransaction = {
      transaction: {
      description: fdescription,
      value: parseInt(fvalue),
      category: fcategory,
      year: fyear,
      month: fmonth,
      day: fday,
      yearMonth: fyearMonth,
      yearMonthDay: fyearMonthDay,
      type: ftype
    }
    }

    boby.push(newTransaction)
      boby.push({idupdate:{id:!selectedTrasation._id ? null : selectedTrasation._id}})
    

    onSave(boby)
  }


useEffect(() => {
  document.addEventListener('keydown', handleKeyDown)
  return () => {
    document.removeEventListener('keydown', handleKeyDown)
  }
}, [])

const handleKeyDown = (event) =>{
  if(event.key === 'Escape'){
    onClose(null)
  }
}

const handleFormSubmit =(event) =>{
  event.preventDefault();
  console.log(event)

}
const handelChangeType =(event) =>{
  const type = event.target.value
  SetFType(type)
}
const handelChangeValue =(event) =>{
  const value = event.target.value
  SetFValue(value)
}
const handelChangeDescription =(event) =>{
  const value = event.target.value
  SetFDescription(value)
}
const handelChangeCategory =(event) =>{
  const value = event.target.value
  SetFCategory(value)
}
const handelChangeDay =(event) =>{
  const value = event.target.value
  SetFDay(value)
}
const handelChangeMonth =(event) =>{
  const value = event.target.value
  SetFMonth(value)
}
const handelChangeYear =(event) =>{
  const value = event.target.value
  SetFyear(value)
}
const handelChangeYearMonth =(event) =>{
  const value = event.target.value
  SetFYearMonth(value)
}
const handelChangeYearMonthDay =(event) =>{
  const value = event.target.value
  SetFYearMonthDay(value)
}

  return (
    <div>
      <Modal isOpen={openModal} >
        {/* <form onSubmit={handleFormSubmit}> */}
          <div>
          <div className="row">
            <div className="imput-field col s4">
              <label className="active" htmlFor="description">
                Descrição:
              </label>
              <input id="description" type="text" value={fdescription} onChange={handelChangeDescription} />
            </div>
            
            <div className="imput-field col s4">
              <label className="active" htmlFor="value">
                Valor:
              </label>
              <input id="value" type="number" value={fvalue} autoFocus min="o" onChange={handelChangeValue} />
            </div>

            <div className="imput-field col s4">
              <label className="active" htmlFor="category">
                Categoria:
              </label>
              <input id="category" type="text" value={fcategory} onChange={handelChangeCategory} />
            </div>
          </div>

          <div className="row">
            <div className="imput-field col s4">
              <label className="active" htmlFor="day">
                Dia:
              </label>
              <input id="day" type="number" value={fday}  onChange={handelChangeDay} />
            </div>

            <div className="imput-field col s4">
              <label className="active" htmlFor="month">
                Mes:
              </label>
              <input id="month" type="number" value={fmonth}  onChange={handelChangeMonth} />
            </div>

              <div className="imput-field col s4">
                <label className="active" htmlFor="year">
                  Ano:
                </label>
                <input id="year" type="number" value={fyear}  onChange={handelChangeYear} />
            </div>
          </div>

          <div className="row">
            <div className="imput-field col s4">
              <label className="active" htmlFor="yearMonth">
                Ano-Mes:
              </label>
              <input id="yearMonth" type="text" value={fyearMonth} onChange={handelChangeYearMonth} />
            </div>

            <div className="imput-field col s4">
              <label className="active" htmlFor="yearMonthDay">
                Ano-Mes-Dia:
              </label>
              <input id="yearMonthDay" type="text" value={fyearMonthDay} onChange={handelChangeYearMonthDay} />
            </div>

            <div className="imput-field col s4">
              <label className="active" htmlFor="type">
                Tipo:
              </label>
              <select id="type" className="browser-default" value={ftype} onChange={handelChangeType} >
                <option value="0">Selecione</option>
                <option value="-">Despesas</option>
                <option value="+">Receita</option>
              </select>
            </div>

          </div>
          <button className="waves-effect waves-light btn" name="Salvar" onClick = {handleClickBotton}>Salvar</button>
        </div>
      </Modal>
    </div>
  )
}
