export interface IOrderItem {
  id: number;
  quantity: number;
  price: number;
  title: string;
}

export class OrderItem {
  constructor(
    public id = 0,
    public quantity = 0,
    public price = 0,
    public title = ""
  ) {}
}
