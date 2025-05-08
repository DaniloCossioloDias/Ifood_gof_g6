import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IProduct } from '../../interfaces/entities/product';
import { INovoProdutoPayload } from './novo-produto.payload';
import { ProductRepository } from './product.repository';

@Injectable({
  providedIn: 'root',
})
export class ProductHttpService extends ProductRepository {
  private readonly baseUrl: string = environment.baseUrl + environment.product;

  constructor(private readonly http: HttpClient) {
    super();
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl);
  }

  getProductsByRestaurant(restauranteId: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}/restaurant/${restauranteId}`);
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/${id}`);
  }

  addProduct(product: INovoProdutoPayload, restaurantId: number): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.baseUrl}/restaurant/${restaurantId}`, product);
  }

  updateProduct(id: number, product: INovoProdutoPayload): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
