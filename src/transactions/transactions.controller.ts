import { Controller, Post, Patch, Delete } from '@nestjs/common'


@Controller('transactions')
export class TransactionsController {
  constructor() {}

  @Post()
  addTransaction(): void {

  }

  @Patch()
  updateTransaction(): void {
    
  }

  @Delete()
  deleteTransaction(): void {

  }
}