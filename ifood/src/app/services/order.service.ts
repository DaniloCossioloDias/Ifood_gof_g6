import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOrder } from '../interfaces/entities/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = ''; 
  constructor(private http: HttpClient) {}


  getOrders(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(this.apiUrl);
  }
}
