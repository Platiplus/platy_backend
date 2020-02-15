import { Controller, Post, Patch, Body, UsePipes, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { UserDTO } from './dto/user.dto';

import sanitize from '../utils/tokens'

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}

  @Post()
  @UsePipes(new ValidationPipe())
  registerUser(@Body() user: UserDTO, @Headers('Authorization') authorization: string){
    const token = sanitize(authorization)

    this.userService.register(user, token);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  loginUser(@Body() user: Partial<UserDTO>, @Headers('Authorization') authorization: string){
    const token = sanitize(authorization)

    this.userService.login(user, token);
  }

  @Patch()
  @UsePipes(new ValidationPipe())
  updateUser(@Body() user: Partial<UserDTO>, @Headers('Authorization') authorization: string){
    const token = sanitize(authorization)

    this.userService.update(user, token);
  }
}
