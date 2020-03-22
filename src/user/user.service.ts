import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import Axios from 'axios'
import URL  from '../utils/urls'

@Injectable()
export class UserService {

  async get(token: string): Promise<Partial<UserDTO>> {
    try {
      const response = await Axios.get(URL.getUser(),
        { headers: { authorization: token } }
      );

     delete response.data.user.requests;
     return response.data.user;

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async register(user: UserDTO): Promise<Partial<UserDTO>> {
    try {
      const response = await Axios.post(
        URL.InsertUser(),
        user
      );
      delete response.data.createdUser.requests;
      return response.data.createdUser;
      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(user: Partial<UserDTO>): Promise<string> {
    try {
      const response = await Axios.post(
        URL.LoginUser(),
        user
      );
      
      return response.data;
      
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(user: Partial<UserDTO>, token: string): Promise<Partial<UserDTO>> {
    try {
      const response = await Axios.patch(
        URL.UpdateUser(),
        user,
        { headers: { Authorization: token } }
      );
      delete response.data.user.requests;
      return response.data.user;

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
