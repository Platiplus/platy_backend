import { Controller, Body, Headers, Post, Patch, Delete, UsePipes, UseGuards, Get, Param, Query } from '@nestjs/common'
import { TransactionsService } from './transaction.service'
import { TransactionDTO } from './dto/transaction.dto'
import { ValidationPipe } from '../shared/validation.pipe';
import {v4 as uuid} from 'uuid'
import * as moment from 'moment'
import { AuthGuard } from 'src/shared/auth-guard';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  @UseGuards(new AuthGuard())
  async getTransactions(
    @Headers('authorization') token: string,
    @Query() params: []): Promise<TransactionDTO[]>
    {
      return await this.transactionsService.get(params, token);
    }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  async addTransaction(@Body() transaction: TransactionDTO, @Headers('authorization') token: string) {
    if(transaction.quotas != 0 && transaction.quotas != 'unique'){
      let createdTransactions = []
      const uniqueIdentifier = uuid()
      
      for(let i = 0; i < transaction.quotas; i++){
        const { type, date, description, target, value, category, status, owner, account } = transaction
        const quota = new TransactionDTO(
          type,
          moment(date, 'DD/MM/YYYY').add(i, 'month').format('DD-MM-YYYY'),
          description,
          target,
          value,
          category,
          status,
          uniqueIdentifier,
          owner,
          account
        )
        createdTransactions.push(await this.transactionsService.insert(quota, token))
      }
      return createdTransactions

    } else {
      return this.transactionsService.insert(transaction, token)
    }
  }

  @Patch()
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  async updateTransaction(@Body() transaction: Partial<TransactionDTO>, @Headers('authorization') token: string) {
    if(transaction.quotas != undefined && transaction.quotas != 'unique') {
      let updatedTransactions = [];
      const transactions = await this.transactionsService.getCorrelatedTransactions(transaction.quotas, token)
      const firstIdx = transactions.indexOf(transactions.find((x) => x._id == transaction._id));
      const referenceDate = transaction.date;
        
      for (let i = firstIdx; i < transactions.length; i++){
        transaction._id = transactions[i]._id;
        if (transaction.date !== undefined) {
          transaction.date = moment(referenceDate, 'DD/MM/YYYY').add(i - firstIdx, 'month').format('DD-MM-YYYY')
        }
        updatedTransactions.push(await this.transactionsService.update(transaction, token));
      }

      return updatedTransactions;
      
    } else {
      return this.transactionsService.update(transaction, token)
    }
  }

  @Delete()
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  async deleteTransaction(@Body() transaction: Partial<TransactionDTO>, @Headers('authorization') token: string) {
    if(transaction.quotas != undefined && transaction.quotas != 'unique') {
      let deletedTransactions = [];
      const transactions = await this.transactionsService.getCorrelatedTransactions(transaction.quotas, token)
      const firstIdx = transactions.indexOf(transactions.find((x) => x._id == transaction._id));
      for (let i = firstIdx; i < transactions.length; i++){
        deletedTransactions.push(
          `${await this.transactionsService.delete(transactions[i], token)} - _id: ${transactions[i]._id}`
        );
      }
      return deletedTransactions;

    } else {
      return this.transactionsService.delete(transaction, token)
    }
  }
}