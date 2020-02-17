import { IsString, IsNumber } from 'class-validator';

export class AccountDTO {
  @IsString()
  public _id? : string;

  @IsString()
  public description: string;

  @IsString()
  public owner: string;

  @IsNumber()
  public balance: number;

  constructor(description, owner, balance = 0, _id = null){
    this.description = description;
    this.owner = owner;
    this.balance = balance;
    this._id = _id;
  }
}