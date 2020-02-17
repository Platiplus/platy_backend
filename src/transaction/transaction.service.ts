import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { TransactionDTO } from './dto/transaction.dto'
import Axios from 'axios'
import URL  from '../utils/urls'

@Injectable()
export class TransactionsService {
  async insert(transaction: TransactionDTO, token: string){
    try {
      const response = Axios.post(
        URL.InsertTransaction(),
        transaction, 
        { headers: { authorization: token } }
      );

      return (await response).data.createdTransaction;

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR); 
    } 
  }

  async get(params: Partial<TransactionDTO>, token: string): Promise<TransactionDTO[]>{
    try {
      const response = await Axios.get(
        URL.GetTransactions(),
        {
          params,
          headers: { authorization: `Bearer ${token}` }
        }
      );

      return (await response).data.transactions;
      
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
          headers: { authorization: `Bearer ${token}` }
        }
      );

      return (await response).data.transactions;
      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(transaction: Partial<TransactionDTO>, token: string){
    try {
      const response = Axios.patch(
        URL.PatchTransactions(transaction._id),
        transaction, 
        { headers: { authorization: token }}
        );

      return (await response).data.transaction;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(transaction: Partial<TransactionDTO>, token: string){
    try {
      const response = Axios.delete(
        URL.DeleteTransactions(transaction._id),
        { headers: { authorization: token }}
      );
      return (await response).data.message;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }    
  }
}