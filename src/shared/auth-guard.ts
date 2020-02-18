import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import Axios from 'axios'
import URL  from '../utils/urls'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    try {
      const request = ctx.switchToHttp().getRequest();
      const token = request.headers.authorization;

    if(!token){
      return false;
    }
    
      await this.validateToken(token);
      return true;
    } catch (error) {
      throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);
    }
  }

  async validateToken(auth: string): Promise<boolean> {
    try {
      if (auth.split(' ')[0] !== 'Bearer'){
        return false;
      }
      await Axios.post(URL.verifyToken(), {}, { headers: { authorization: auth }});
      return true;
    } catch (error) {
      return false; 
    }
  }
}
