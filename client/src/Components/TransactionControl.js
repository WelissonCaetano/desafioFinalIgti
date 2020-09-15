import React from 'react'
import Actions from './Actions'

export default function TransactionControl({transactions, onDelete, onEdit}) {

  const handleActionClick = (id, type) => {

    const transation = transactions.find((transation) => transation._id === id)
    
    if(type === 'delete'){
      onDelete(id)
    }
    if(type === 'edit'){
      onEdit(transation)
    }
  }
  
  return (
    <div className="container center">
    <table className="striped center">
      <tbody>
        {transactions.map(({_id,description,value,category,day,type}) =>{
          return (
          <tr key={_id} >
            <td>{day}</td>
            <td><p>{category}</p><small>{description}</small></td>
            <td>{`R$ ${value}`}</td>
            <td><Actions onActionClick={handleActionClick} id={_id} type="edit"/></td>
            <td><Actions onActionClick={handleActionClick} id={_id} type="delete"/></td>
          </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  )
}
