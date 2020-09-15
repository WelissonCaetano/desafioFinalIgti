import axios from "axios";

const  API_URL = "http://localhost:3001/api/transaction/period/";
const  API_URL_CRUD = "http://localhost:3001/api/transaction/";

// const GRADE_VALIDATION = [
//   {
//     id:1,
//     gradetype:'Exercícios',
//     minValue: 0,
//     maxValue:10
//   },
//   {
//     id:2,
//     gradetype:'Trabalho Prático',
//     minValue: 0,
//     maxValue:40
//   },
//   {
//     id:3,
//     gradetype:'Desafio',
//     minValue: 0,
//     maxValue:50
//   }
// ]

async function getAllTransaction(period){
  const res = await axios.get(API_URL+period);


  const transactions = res.data;

  return transactions;
}

async function insertTransaction(bodyTransation){
  // console.log(bodyTransation)
const response = await axios.post(API_URL_CRUD, bodyTransation)
console.log(response)
return response.data;
}
async function updateTransaction(bodyTransation){
  const [transaction, id] = bodyTransation
const response = await axios.put(`${API_URL_CRUD}/${id}`, transaction)
// console.log(response.data)
return response.data;
}

async function deleteTransaction (id){
  const response = await axios.delete(`${API_URL_CRUD}/${id}`);
  console.log(response.data)
  return response.data;
}

async function getValidatioFromGradeType(gradeType){
  // const gradeValidation =GRADE_VALIDATION.find(
  //   (item) => item.gradetype === gradeType
  // );

  // const { minValue, maxValue } =  gradeValidation;
  // return{
  //   minValue,
  //   maxValue,
  // }
}
export {
  getAllTransaction, deleteTransaction, insertTransaction, updateTransaction
}

// export {
//   getAllGrades,insertGrade,updateGrade,deleteGrade,getValidatioFromGradeType
// }