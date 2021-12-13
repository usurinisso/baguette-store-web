import { Baguette } from './baguette';

export class Order {
  deliveryAddress: string;
  deliveryInfo: string;
  price: string;
  id: number;
  delivered: boolean;
}

export class OrderWithUser {
  deliveryAddress: string;
  deliveryInfo: string;
  price: string;
  id: number;
  delivered: boolean;
  user: {
    id: number;
    userName: string;
  };
}

export class OrderWithBaguettes {
  deliveryAddress: string;
  deliveryInfo: string;
  price: string;
  id: number;
  delivered: boolean;
  baguettes: Baguette[];
  user: {
    id: number;
    userName: string;
  };
}
