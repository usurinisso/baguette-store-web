import { UserCart } from './cart';
import { Order } from './order';

export class User {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  token: string;
  cart: UserCart | null;
  orders: Order[];
  roleType: string;
}

export class UserProfile {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  cart: UserCart | null;
  orders: Order[];
  roleType: string;
}
