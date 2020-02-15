const baseUrl = 'http://localhost:8080/'

export default class Urls {
  InsertTransaction(){
    return `${baseUrl}/transactions/`
  }
  GetTransactions(){
    return `${baseUrl}/transactions/`
  }
  PatchTransactions(_id){
    return `${baseUrl}/transactions/${_id}`
  }
  DeleteTransactions(_id){
    return `${baseUrl}/transactions/${_id}`
  }
}