const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const create = async (req, res) => {

  const transaction = new TransactionModel({
      description: req.body.description,
      value: req.body.value,
      category: req.body.category,
      year: req.body.year,
      month: req.body.month,
      day: req.body.day,
      yearMonth: req.body.yearMonth,
      yearMonthDay: req.body.yearMonthDay,
      type: req.body.type,
  });

  try {
    const data = await transaction.save();
    if(!data){
      res.send({ message: 'Falha ao inserir transação' });
      return;
    }
    res.send({ message: 'Transação inserida com sucesso' });
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
  }
};

const findAll = async (req, res) => {
  console.log("chegou")
  const name = req.query.name;

  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const transactions = await TransactionModel.find(condition);
    if(!transactions){
      res.send({message: "Falha a buscar transaçoes"});
      return;
    }
    res.send(transactions)
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todas os transaçoes' });
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {

    const transaction = await TransactionModel.findById({ _id: id });

    if (!transaction) {
      res.status(404).send('Nao encontrado nenhuma Transação');
      return;
    }
    res.send(transaction);

  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar a transação de id: ' + id });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const transaction = await TransactionModel.findByIdAndUpdate({_id: id }, req.body, {new: true});

    if(!transaction){
      res.send({message:"Falha ao atualiar a transação"});
      return;
    }
    res.send(transaction)
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a transação de id: ' + id });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const resposnse = await TransactionModel.findOneAndRemove({_id:id})
    if(resposnse.length < 1){
      res.send({message:"Falha ao deletar a transação",status:false});
      return;
    }else{
      res.send({message:"Deleção realizada com sucesso",status:true});
    }
  } catch (error) {
    res
      .status(200)
      .send({ message: 'Nao foi possivel deletar a transação id: ' + id });
  }
};

const removeAll = async (req, res) => {
  try {
    const transaction = await TransactionModel.deleteMany()
    res.sent({message: " Tudo foi removido"})
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Transações' });
  }
};

const findDate = async (req, res) => {
  const period = req.params.pd;

  try {

    const transaction = await TransactionModel.find({ yearMonth: period });
    const data = {
      length: transaction.length,
      transaction: transaction
    }

    if (!transaction) {
      res.status(404).send('Nao encontrado nenhuma Transação');
      return;
    }
    res.send(data);

  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar a transação de id: ' + id });
  }
};

module.exports = { create, findAll, findOne, update, remove, removeAll, findDate };
