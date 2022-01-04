export interface IPermission {
  id: number;
  name: string;
}

export class Permission implements IPermission {
  constructor(public id = 0, public name = "") {}
}
