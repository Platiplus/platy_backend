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
  async registerUser(@Body() user: UserDTO, @Headers('authorization') token: string): Promise<Partial<UserDTO>>{
    const createdUser = await this.userService.register(user, token);
    delete createdUser.requests;
    return createdUser;
  }

  @Post('api/login')
  @UsePipes(new ValidationPipe())
  loginUser(@Body() user: Partial<UserDTO>): Promise<string>{
    const token = this.userService.login(user);
    return token;
  }

  @Patch()
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  async updateUser(@Body() user: Partial<UserDTO>, @Headers('authorization') token: string): Promise<Partial<UserDTO>>{
    const updatedUser = await this.userService.update(user, token);
    delete updatedUser.requests;
    return updatedUser;
  }
}
