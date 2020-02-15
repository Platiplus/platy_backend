import { Injectable } from '@nestjs/common'
import { TransactionDTO } from './dto/transactions.dto'
import Axios from 'axios'
import Urls  from '../utils/urls'

const URL = new Urls()

@Injectable()
export class TransactionsService {
  insert(transaction: TransactionDTO, token: string){
    Axios.post(URL.InsertTransaction(), transaction, { headers: { Authorization: `Bearer ${token}` } })
    .then((result) => {
      return result.data.createdTransaction;
    })
    .catch((error) => {
      return error;
    })
  }

  getCorrelatedTransactions(correlationId: string, token: string){
    return Axios.get(URL.GetTransactions(), {params: { quotas: correlationId }, headers: { Authorization: `Bearer ${token}` }})
    .then((transactions) => {
      return transactions.data.transactions;
    })
    .catch((error) => {
      return error;
    })
  }

  update(transaction: Partial<TransactionDTO>, token: string){
    delete transaction._id

    return Axios.patch(URL.PatchTransactions(transaction._id), transaction, { headers: { Authorization: `Bearer ${token}` } } )
    .then((transactions) => {
      return transactions.data.transactions;
    })
    .catch((error) => {
      return error;
    })
  }

  delete(transaction: Partial<TransactionDTO>, token: string){
    return Axios.delete(URL.DeleteTransactions(transaction._id), { headers: { Authorization: `Bearer ${token}` } })
    .then((transactions) => {
      return transactions.data.transactions;
    })
    .catch((error) => {
      return error;
    })
  }
}