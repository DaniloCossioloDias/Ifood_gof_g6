import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IProduct } from '../../interfaces/entities/product';
import { ProductRepository } from './product.repository';
import { INovoProdutoPayload } from './novo-produto.payload';
import type { IRestaurant } from 'src/app/restaurantes/lista-restaurantes/lista-restaurantes.page';

@Injectable()
export class ProductInMemoryService extends ProductRepository {
  private products: IProduct[] = [];
  private idCounter = 1;

  getProducts() {
    return of(this.products);
  }

  getProductsByRestaurant(restaurantId: number) {
    return of(this.products.filter(p => p.restaurante.id === restaurantId));
  }

  getProductById(id: number) {
    return of(this.products.find(p => p.id === id)!);
  }

  addProduct(product: INovoProdutoPayload, restaurantId: number) {
    const newProduct: IProduct = {
      id: this.idCounter++,
      ...product,
      restaurante: {} as IRestaurant,
      createdAt: new Date()
    };
    this.products.push(newProduct);
    return of(newProduct);
  }

  updateProduct(id: number, product: INovoProdutoPayload) {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...product };
    }
    return of(this.products[index]);
  }

  deleteProduct(id: number) {
    this.products = this.products.filter(p => p.id !== id);
    return of(void 0);
  }
}
