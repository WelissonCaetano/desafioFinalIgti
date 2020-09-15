import React, { useState, useEffect } from 'react';

import * as api from './Api/ApiService.js'
import Spinner from './Components/Spinner.js';
import TransactionControl from './Components/TransactionControl.js';
import Select from './Components/Select.js';
import Input from './Components/Input.js';
import Buuton from './Components/Buuton.js';
import Filtro from './Components/Filtro.js';
import ModalTrasation from './Components/ModalTrasation.js';
import Actions from './Components/Actions'

export default function App() {
  const dataAtual = new Date();
  const t = (parseInt(dataAtual.getMonth())+1).length
  const hoje = dataAtual.getFullYear()+"-"+(t === 1 ? (parseInt(dataAtual.getMonth())+1) : '0'+(parseInt(dataAtual.getMonth())+1) )

  const [alltransation, setTransation] = useState([]);
  const [allFiltransation, setFilTransation] = useState([]);
  const [userFilter, setUserFilter] = useState('')
  const [selectPeriod, setSelectPeriod] = useState(hoje)
  const [selectTransaction, setSelectTransaction] = useState([])
  const [isModalOpem, setisModalOpem] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [lengthTransations, setLengthTransations] = useState(0)
  const [receita, setReceita] = useState(0)
  const [despesas, setDespesas] = useState(0)
  

  useEffect(() => {
    let receita = 0;
    const getTransaction = async() => {
      const transactions = await api.getAllTransaction(selectPeriod)
      const {transaction , length } = transactions

      for (let i = 0; i < transaction.length; i++) {
        if(transaction[i].type === '+')
        receita = receita + transaction[i].value;
      }
      
      setReceita(receita)
      setTransation(transaction)
      setLengthTransations(length)
      setFilTransation(Object.assign([], transaction))
    }

   getTransaction()
  
  }, [selectPeriod, isSaved]);

  const handleChangeSelect= (value) =>{
    setSelectPeriod(value)
  };

  useEffect(() => {
    let despesas = 0;
    for (let i = 0; i < lengthTransations; i++) {
     if(allFiltransation[i].type === '-')
     despesas = despesas + allFiltransation[i].value;
   }
 
   setDespesas(despesas)
  }, [allFiltransation])

  const handleOpemModal = () =>{
    setisModalOpem(true)
  };
  const handleEdit = (transaction) =>{
    setSelectTransaction(transaction)
    setisModalOpem(true)
  };
  const handleDelete = async(id) =>{
   await api.deleteTransaction(id);

    const deletedTransation = allFiltransation.findIndex(
      (transaction) => transaction._id == id
    )

    // console.log('meio '+deletedTransation);
    const newTransation = allFiltransation.splice(deletedTransation)

    setFilTransation(newTransation)

    setIsSaved(true)

  };


  const HandlePersisteDate = async(body) =>{
    const [ transaction,idupdate ] = body;
    if(idupdate.idupdate.id){
      const data = await api.updateTransaction([transaction.transaction,idupdate.idupdate.id])
      if(data){
        setIsSaved(true)
        handleClose()
      }
    }else{
      const data = await api.insertTransaction(transaction.transaction)
      if(data){
        setIsSaved(true)
        handleClose()
      }
    }
  };

  const handleClose = () =>{
    setisModalOpem(false)
  };

  const onFilter = (value) =>{
    setUserFilter(value)
    const filteredtransaction = alltransation.filter((transation) => {
      return transation.description.includes(value)
    })

    setFilTransation(filteredtransaction)
    setLengthTransations(filteredtransaction.length)
  };
  
  return <div className="container center">
     <h3>Desafio Final do Bootcamp Full Stack</h3>
     <h5>Sistema de Financias Pessoais</h5>
     <div className="container center">
     <Select  period={selectPeriod} onChangeSelect={handleChangeSelect} />
     </div>
     <div className="row">
     <Input id={1} value={lengthTransations} label={'Lancamentos'} />
     <Input id={2} value={ receita} label={'Receitas'} />
     <Input id={3} value={despesas} label={'Despesas'} />
     <Input id={4} value={(receita-despesas)} label={'Saldo'} />
     </div>
     <div className="row">
     <div className="col s3">
       <Actions onActionClick={handleOpemModal} id='save' type="add"/>
       </div>
       <Filtro id={5}  label={'Filtro'} onChangeFilter={onFilter} />
     </div>
     {allFiltransation.length === 0  && <Spinner />}
     {allFiltransation.length > 0  && <TransactionControl 
        transactions={allFiltransation}
        onDelete={handleDelete}
        onEdit={handleEdit}
     />
     }
     {isModalOpem && <ModalTrasation
     onSave={HandlePersisteDate}
     onClose={handleClose}
     selectedTrasation={selectTransaction}
     openModal={isModalOpem}
     d={dataAtual}
     />}
     </div>;
}
