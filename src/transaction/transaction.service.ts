import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { TransactionDTO } from './dto/transaction.dto'
import Axios from 'axios'
import URL  from '../utils/urls'

@Injectable()
export class TransactionsService {
  async insert(transaction: TransactionDTO, token: string){
    delete transaction._id;
    delete transaction.owner;

    try {
      const response = Axios.post(
        URL.InsertTransaction(),
        { ...transaction }, 
        { headers: { authorization: token } }
      );
      return (await response).data.createdTransaction;

    } catch (error) {
      console.log(error)
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR); 
    } 
  }

  async get(params: [], token: string){
    try {
      const response = await Axios.get(
        URL.GetTransactions(),
        {
          params,
          headers: { authorization: token }
        }
      );
      
      response.data.transactions.forEach(transaction => delete transaction.requests);
      
      return response.data.transactions;
      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getCorrelatedTransactions(correlationId: string, token: string){
    try {
      const response = await Axios.get(
        URL.GetTransactions(),
        {
          params: { quotas: correlationId },
          headers: { authorization: token }
        }
      );

      response.data.transactions.forEach(transaction => delete transaction.requests);
      return response.data.transactions;
      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(transaction: Partial<TransactionDTO>, token: string){
    try {
      const _id = transaction._id;
      delete transaction._id;

      const response = await Axios.patch(
        URL.PatchTransactions(_id),
        { ...transaction }, 
        { headers: { authorization: token }}
      );

      return response.data.transaction;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(transaction: Partial<TransactionDTO>, token: string){
    try {
      console.log(transaction)
      const response = await Axios.delete(
        URL.DeleteTransactions(transaction._id),
        { headers: { authorization: token }}
      );
      
      return response.data.message;

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }    
  }
}