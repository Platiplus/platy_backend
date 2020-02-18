import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class TransactionDTO {
    @IsNumber()
    public type: number;

    @IsString()
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
    public _id?: string;
    
    public owner?: string;
    
    public quotas: any;

    constructor(type, date, description, target, value, category, status, quotas, owner, _id = 'null')
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