import { Controller, Post, Patch, Body, UsePipes, Headers, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { UserDTO } from './dto/user.dto';
import { AuthGuard } from 'src/shared/auth-guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}

  @Get()
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  async getUserInfo(@Headers('authorization') token: string): Promise<Partial<UserDTO>>{
    return await this.userService.get(token);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async registerUser(@Body() user: UserDTO, @Headers('authorization') token: string): Promise<Partial<UserDTO>>{
    return await this.userService.register(user, token);
  }

  @Post('api/login')
  @UsePipes(new ValidationPipe())
  async loginUser(@Body() user: Partial<UserDTO>): Promise<string>{
    return await this.userService.login(user);
  }

  @Patch()
  @UsePipes(new ValidationPipe())
  @UseGuards(new AuthGuard())
  async updateUser(@Body() user: Partial<UserDTO>, @Headers('authorization') token: string): Promise<Partial<UserDTO>>{
    return await this.userService.update(user, token);
  }
}
