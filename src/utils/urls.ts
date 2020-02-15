const data = process.env.DATA_API;
const auth = process.env.AUTH_API;

export default class Urls {
  static InsertTransaction(){
    return `${data}/transactions/`
  }
  static GetTransactions(){
    return `${data}/transactions/`
  }
  static PatchTransactions(_id){
    return `${data}/transactions/${_id}`
  }
  static DeleteTransactions(_id){
    return `${data}/transactions/${_id}`
  }
  static InsertUser(){
    return `${data}/`
  }
  static UpdateUser(_id){
    return `${data}/`
  }
  static LoginUser(){
    return `${data}/`
  }
}