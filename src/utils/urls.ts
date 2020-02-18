const data = process.env.DATA_API;
const auth = process.env.AUTH_API;

export default class Urls {
  static InsertTransaction(): string{
    return `${data}/transactions/`
  }
  static GetTransactions(): string{
    return `${data}/transactions/all`
  }
  static PatchTransactions(_id: string): string{
    return `${data}/transactions/${_id}`
  }
  static DeleteTransactions(_id: string): string{
    return `${data}/transactions/${_id}`
  }
  static getUser(): string {
    return `${data}/users/`
  }
  static InsertUser(): string{
    return `${data}/users/`
  }
  static UpdateUser(): string{
    return `${data}/users/`
  }
  static LoginUser(): string{
    return `${auth}/signin`
  }
  static verifyToken(): string{
    return `${auth}/verify`
  }
  static getAllAccounts(): string{
    return `${data}/accounts/all`;
  }
  static getAccount(_id: string): string{
    return `${data}/accounts/${_id}`;
  }
  static insertAccount(): string{
    return `${data}/accounts/`;
  }
  static updateAccount(_id: string): string{
    return `${data}/accounts/${_id}`;
  }
  static deleteAccount(_id: string): string{
    return `${data}/accounts/${_id}`;
  }
}