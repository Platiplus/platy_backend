import { IsString, IsBoolean, IsNumber, IsDateString } from 'class-validator';

export class TransactionDTO {
    @IsNumber()
    public type: number;

    @IsDateString()
    public date: string;

    @IsString()
    public description: string;

    @IsString()
    public target: string;

    @IsNumber()
    public value: number;

    @IsString()
    public category: string;

    @IsBoolean()
    public status: boolean;

    @IsString()
    public owner: string;

    @IsString()
    public _id?: string;
    
    public quotas: any;

    constructor(type, date, description, target, value, category, status, quotas, owner, _id = null)
    {
      this.type = type;
      this.date = date;
      this.description = description;
      this.target = target;
      this.value = value;
      this.category = category;
      this.status = status;
      this.quotas = quotas;
      this.owner = owner;
      this._id = _id;
    }
}