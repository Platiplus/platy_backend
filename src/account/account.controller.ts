import { Controller, Get, UsePipes, Patch, Delete, UseGuards, Body, Headers, Param } from '@nestjs/common';
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
    this.accountService.getAllAccounts(token);
  }

  @Get()
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  getAccountInfo(@Param() accountID: string, @Headers('authorization') token: string){
    this.accountService.getAccount(accountID, token);    
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
