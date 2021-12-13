import { Baguette } from './baguette';

export class UserCart {
  id: number;
}

export class Cart {
  id: number;
  baguettes: Baguette[];
  user: { id: number; userName: string };
}
