import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Shop } from '../models/shop';
import { Baguette } from '../models/baguette';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {
  constructor(private http: HttpClient) {}

  getShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(`${environment.apiUrl}/shops`);
  }

  getBaguettes(id: number): Observable<Baguette[]> {
    return this.http.get<Baguette[]>(
      `${environment.apiUrl}/shops/${id}/baguettes`
    );
  }
}
