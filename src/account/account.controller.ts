import { Controller, Get, UsePipes, Post, Patch, Delete, UseGuards, Body, Headers, Param } from '@nestjs/common';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { AccountDTO } from './dto/account.dto';
import { AuthGuard } from 'src/shared/auth-guard';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService){}

  @Get('all')
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  getAllAccountsInfo(@Headers('authorization') token: string){
    const accounts = this.accountService.getAllAccounts(token);
    return accounts;
  }
  
  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  insertAccount(@Body() account: Partial<AccountDTO>, @Headers('authorization') token: string){
    this.accountService.insert(account, token);
  }

  @Get('/:_id')
  @UseGuards(new AuthGuard())
  getAccountInfo(@Param() accountID: Partial<AccountDTO>, @Headers('authorization') token: string){
    console.log(accountID._id)
    const account = this.accountService.getAccount(accountID._id, token);    
    return account;
  }

  @Patch()
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  updateAccountInfo(@Body() account: Partial<AccountDTO>, @Headers('authorization') token: string){
    this.accountService.updateAccount(account, token);
  }

  @Delete()
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  deleteAccount(@Body() account: Partial<AccountDTO>, @Headers('authorization') token: string){
    this.accountService.deleteAccount(account._id, token);
  }

}
