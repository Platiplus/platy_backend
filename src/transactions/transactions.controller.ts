import { Controller, Body, Headers, Post, Patch, Delete } from '@nestjs/common'
import { TransactionsService } from './transactions.service'
import { TransactionDTO } from './dto/transactions.dto'
import sanitize from '../utils/tokens'
import {v4 as uuid} from 'uuid'
import * as moment from 'moment'


@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post('teste')
  teste(@Body() transaction: TransactionDTO){
    console.log(transaction)
  }

  @Post()
  addTransaction(@Body() transaction: TransactionDTO, @Headers('Authorization') authorization: string): void {
    const token = sanitize(authorization)

    if(transaction.quotas != 0){
      const uniqueIdentifier = uuid()
      
      for(let i = 0; i < transaction.quotas; i++){
        const { type, date, description, target, value, category, status, owner } = transaction
        const quota = new TransactionDTO(
          type,
          moment(date, 'DD/MM/YYYY').add(i, 'month').format('DD-MM-YYYY'),
          description,
          target,
          value,
          category,
          status,
          uniqueIdentifier,
          owner
        )
        this.transactionsService.insert(quota, token)
      }
    }
    this.transactionsService.insert(transaction, token)
  }

  @Patch()
  updateTransaction(@Body() transaction: Partial<TransactionDTO>, @Headers('Authorization') authorization: string): void {
    const token = sanitize(authorization)

    if(transaction.quotas != undefined && transaction.quotas != 'unique') {
      this.transactionsService.getCorrelatedTransactions(transaction.quotas, token)
      .then((transactions) => {
        const firstIdx = transactions.indexOf(transactions.find((x) => x._id == transaction._id));
        const referenceDate = transaction.date;
        
        for (let i = firstIdx; i < transactions.length; i++){
          transaction._id = transactions[i]._id;
          if (transaction.date !== undefined) {
            transaction.date = moment(referenceDate, 'DD/MM/YYYY').add(i - firstIdx, 'month').format('DD-MM-YYYY')
          }
          this.transactionsService.update(transaction, token)
        }
      });
    } else {
      this.transactionsService.update(transaction, token)
    }
  }

  @Delete()
  deleteTransaction(@Body() transaction: Partial<TransactionDTO>, @Headers('Authorization') authorization: string): void {
    const token = sanitize(authorization)

    if(transaction.quotas != undefined && transaction.quotas != 'unique') {
      this.transactionsService.getCorrelatedTransactions(transaction.quotas, token)
      .then((transactions) => {
        const firstIdx = transactions.indexOf(transactions.find((x) => x._id == transaction._id));
        for (let i = firstIdx; i < transactions.length; i++){
          this.transactionsService.delete(transaction, token)
        }
      });
    } else {
      this.transactionsService.delete(transaction, token)
    }
  }
}