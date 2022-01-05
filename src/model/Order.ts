import { IOrderItem, OrderItem } from "./OrderItems";
export interface IOreder {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  createdAt: string;
  orderItems: IOrderItem[];
  selected?: boolean;
}

export class Order {
  constructor(
    public id = "",
    public email = "",
    public firstname = "",
    public lastname = "",
    public createdAt = "",
    public orderItems = new OrderItem(0, 0, 0, "")
  ) {}
}
