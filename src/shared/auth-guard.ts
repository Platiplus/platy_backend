import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import Axios from 'axios'
import URL  from '../utils/urls'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if(!token){
      return false;
    }
    
    this.validateToken(token);

    return true;
  }

  async validateToken(auth: string){
    if (auth.split(' ')[0] !== 'Bearer'){
      throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);
    }
    
    try {
      await Axios.post(URL.verifyToken(), {}, { headers: { authorization: auth }});
    } catch (error) {
      throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);
    }
  }
}
