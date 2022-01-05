export interface IProducts {
  id: number;
  price: number;
  title: string;
  description: string;
  image: string;
}

export class Products implements IProducts {
  constructor(
    public id = 0,
    public price = 0,
    public title = "",
    public description = "",
    public image = ""
  ) {}
}
