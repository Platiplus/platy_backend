import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AccountDTO } from './dto/account.dto';
import Axios from 'axios'
import URL  from '../utils/urls'

@Injectable()
export class AccountService {
  async getAllAccounts(token: string) {
    try {
      const response = await Axios.get(URL.getAllAccounts(), { headers: { Authorization: token } });
      response.data.accounts.forEach(account => delete account.requests);
      return response.data.accounts;

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  async getAccount(_id: string, token: string) {
    try {
      const response = await Axios.get(URL.getAccount(_id), { headers: { Authorization: token } });
      
      delete response.data.account.requests;
      return response.data.account;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async insert(account: Partial<AccountDTO>, token: string) {
    try {
      const response = await Axios.post(URL.insertAccount(), account, { headers: { Authorization: token } });
      delete response.data.createdAccount.requests;
      return response.data.createdAccount;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateAccount(account: Partial<AccountDTO>, token: string) {
    try {
      const _id = account._id;
      delete account._id
      
      const response = await Axios.patch(URL.updateAccount(_id), account, { headers: { Authorization: token } });
      delete response.data.account.requests;
      return response.data.account;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteAccount(accountID: string, token: string) {
    try {
      const response = await Axios.delete(URL.deleteAccount(accountID), { headers: { Authorization: token } });
      return response.data.message;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
