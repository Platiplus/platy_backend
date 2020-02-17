import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import Axios from 'axios'
import URL  from '../utils/urls'

@Injectable()
export class UserService {

  async register(user: UserDTO, token: string): Promise<any> {
    try {
      const response = Axios.post(
        URL.InsertUser(),
        user, 
        { headers: { Authorization: token } }
      );
      return (await response).data.createdUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(user: Partial<UserDTO>): Promise<any> {
    try {
      const response = Axios.post(
        URL.LoginUser(),
        user
      );
      return (await response).data;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(user: Partial<UserDTO>, token: string): Promise<any> {
    try {
      const response = Axios.patch(
        URL.UpdateUser(),
        user,
        { headers: { Authorization: token } }
      );
      return (await response).data.user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
