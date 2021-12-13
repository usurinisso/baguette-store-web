import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { OrderWithBaguettes, OrderWithUser } from '../models/order';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<OrderWithUser[]> {
    return this.http.get<OrderWithUser[]>(`${environment.apiUrl}/orders`);
  }

  getOrder(id: number): Observable<OrderWithBaguettes> {
    return this.http.get<OrderWithBaguettes>(
      `${environment.apiUrl}/orders/${id}`
    );
  }

  placeOrder(data: {
    userId: number;
    deliveryAddress: string;
    deliveryInfo: string;
    baguetteIds: number[];
  }) {
    return this.http.post<OrderWithUser>(`${environment.apiUrl}/orders`, data);
  }
}
