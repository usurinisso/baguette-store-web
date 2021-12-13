import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  constructor(private http: HttpClient) {}

  getCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${environment.apiUrl}/carts`);
  }

  getCart(id: number): Observable<Cart> {
    return this.http.get<Cart>(`${environment.apiUrl}/carts/${id}`);
  }

  patchCart(id: number, baguetteIds: number[]): Observable<Cart> {
    return this.http.patch<Cart>(`${environment.apiUrl}/carts/${id}`, {
      baguetteIds
    });
  }

  postCart(id: number, baguetteIds: number[]): Observable<Cart> {
    return this.http.post<Cart>(`${environment.apiUrl}/carts`, {
      userId: id,
      baguetteIds
    });
  }

  deleteCart(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/carts/${id}`);
  }
}
