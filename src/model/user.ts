import { IRole, Role } from "./role";
export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  role?: IRole;
  name?: string;
}

export class User implements IUser {
  constructor(
    public id = 0,
    public firstname = "",
    public lastname = "",
    public email = "",
    public role = new Role(0, "")
  ) {}

  get name() {
    return `${this.firstname} ${this.lastname}`;
  }
}
