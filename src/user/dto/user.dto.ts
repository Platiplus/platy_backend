import { IsString, IsNumber, IsEmail } from 'class-validator';

export class UserDTO {
  @IsString()
  public username: string;

  @IsString()
  public password: string;

  @IsEmail()
  public email: string;

  @IsNumber()
  public initialBalance: number;

  @IsString()
  public _id?: string;

  constructor(username, password, email, initialBalance = 0, _id = 'null'){
    this.username = username;
    this.password = password;
    this.email = email;
    this.initialBalance = initialBalance;
    this._id = _id;
  }
}