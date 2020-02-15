import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import Axios from 'axios'
import URL  from '../utils/urls'

@Injectable()
export class UserService {
  register(user: UserDTO, token: string): void {
    Axios.post(URL.InsertUser(), user, { headers: { Authorization: `Bearer ${token}` } })
    .then((result) => {
      return result.data.createdUser;
    })
    .catch((error) => {
      return error;
    });
  }

  login(user: Partial<UserDTO>, token: string): void {
    Axios.post(URL.LoginUser(), user, { headers: { Authorization: `Bearer ${token}` } })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  }

  update(user: Partial<UserDTO>, token: string): void {
    Axios.patch(URL.UpdateUser(user._id), user, { headers: { Authorization: `Bearer ${token}` } })
    .then((result) => {
      return result.data.createdUser;
    })
    .catch((error) => {
      return error;
    });
  }
}
