import { IPermission } from "./permission";

export interface IRole {
  id: number;
  name: string;
  permissions?: IPermission[];
}

export class Role implements IRole {
  constructor(public id = 0, public name = "") {}
}
