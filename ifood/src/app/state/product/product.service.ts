import { Inject, Injectable } from '@angular/core';
import { IProduct } from '../../interfaces/entities/product';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import type { INovoProdutoPayload } from './novo-produto.payload';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl: string = environment.baseUrl + environment.production
  constructor(@Inject(HttpClient) private readonly http: HttpClient) {}

  /**
   * Retorna todos os produtos.
   */
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl);
  }

  /**
   * Retorna os produtos de um restaurante específico.
   * @param restauranteId ID do restaurante.
   */
  getProductsByRestaurant(restauranteId: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}/restaurant/${restauranteId}`);
  }

  /**
   * Retorna um produto pelo ID.
   * @param id ID do produto.
   */
  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}/${id}`);
  }

  /**
   * Adiciona um novo produto.
   * @param product Produto a ser adicionado.
   */
  addProduct(product: INovoProdutoPayload): Observable<IProduct> {
    return this.http.post<IProduct>(this.baseUrl, product);
  }

  /**
   * Atualiza um produto existente.
   * @param id ID do produto a ser atualizado.
   * @param updatedProduct Dados atualizados do produto.
   */
  updateProduct(id: number, product: INovoProdutoPayload): Observable<IProduct> {
    return this.http.put<IProduct>(`${this.baseUrl}/${id}`, product);
  }

  /**
   * Remove um produto pelo ID.
   * @param id ID do produto a ser removido.
   */
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`)
  }
}