import { Module } from '@nestjs/common'

import { TransactionController } from './transaction.controller'
import { TransactionsService } from './transaction.service'

@Module({
  controllers: [TransactionController],
  providers: [TransactionsService]
})

export class TransactionsModule {}
