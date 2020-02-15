import { Controller, Post, Patch, Body, UsePipes, Headers, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { UserDTO } from './dto/user.dto';
import { AuthGuard } from 'src/shared/auth-guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}

  @Post()
  @UsePipes(new ValidationPipe())
  registerUser(@Body() user: UserDTO, @Headers('authorization') token: string){
    this.userService.register(user, token);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  loginUser(@Body() user: Partial<UserDTO>, @Headers('authorization') token: string){
    this.userService.login(user, token);
  }

  @Patch()
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  updateUser(@Body() user: Partial<UserDTO>, @Headers('authorization') token: string){
    this.userService.update(user, token);
  }
}
