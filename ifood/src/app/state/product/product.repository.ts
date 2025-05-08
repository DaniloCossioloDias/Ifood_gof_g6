import { Observable } from 'rxjs';
import { IProduct } from '../../interfaces/entities/product';
import { INovoProdutoPayload } from './novo-produto.payload';

export abstract class ProductRepository {
  abstract getProducts(): Observable<IProduct[]>;
  abstract getProductsByRestaurant(restauranteId: number): Observable<IProduct[]>;
  abstract getProductById(id: number): Observable<IProduct>;
  abstract addProduct(product: INovoProdutoPayload, restaurantId: number): Observable<IProduct>;
  abstract updateProduct(id: number, product: INovoProdutoPayload): Observable<IProduct>;
  abstract deleteProduct(id: number): Observable<void>;
}
