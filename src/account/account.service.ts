import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AccountDTO } from './dto/account.dto';
import Axios from 'axios'
import URL  from '../utils/urls'

@Injectable()
export class AccountService {
  async getAllAccounts(token: string) {
    try {
      const response = Axios.get(URL.getAllAccounts(), { headers: { Authorization: token } });
      return (await response).data.account;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAccount(_id: string, token: string) {
    try {
      const response = Axios.get(URL.getAccount(_id), { headers: { Authorization: token } });
      return (await response).data.accounts;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateAccount(account: Partial<AccountDTO>, token: string) {
    try {
      const response = Axios.patch(URL.updateAccount(account._id), account, { headers: { Authorization: token } });
      return (await response).data.account;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteAccount(accountID: string, token: string) {
    try {
      const response = Axios.delete(URL.deleteAccount(accountID), { headers: { Authorization: token } });
      return (await response).data.message;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
