export class TransactionDTO {
  constructor(
    public type: number,
    public date: string,
    public description: string,
    public target: string,
    public value: number,
    public category: string,
    public status: boolean,
    public quotas: any,
    public owner: string,
    public _id?: string
  ) {}
}