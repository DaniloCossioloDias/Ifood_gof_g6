import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/entities/product';
import { IRestaurant } from '../interfaces/entities/restaurant';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: IProduct[] = [
    {
      id: 1,
      restaurante: { 
        id: 1, 
        name: 'Restaurante A', 
        description: 'Um restaurante incrível com pratos deliciosos.', 
        address: 'Londrina, Paraná, Rua Belém, 133 - Centro', 
        createdAt: new Date('2023-01-01') 
      },
      name: 'Prato Especial A1',
      description: 'Um prato especial do Restaurante A.',
      price: 50.0,
      available: true,
      createdAt: new Date('2023-03-01'),
    },
    {
      id: 2,
      restaurante: { 
        id: 2, 
        name: 'Restaurante B', 
        description: 'Comida caseira com um toque especial.', 
        address: 'Curitiba, Paraná, Rua XV de Novembro, 456 - Centro', 
        createdAt: new Date('2023-02-15') 
      },
      name: 'Prato Especial B1',
      description: 'Um prato especial do Restaurante B.',
      price: 45.0,
      available: true,
      createdAt: new Date('2023-03-10'),
    },
  ];

  constructor() {}

  /**
   * Retorna todos os produtos.
   */
  getProducts(): IProduct[] {
    return this.products;
  }

  /**
   * Retorna os produtos de um restaurante específico.
   * @param restauranteId ID do restaurante.
   */
  getProductsByRestaurant(restauranteId: number): IProduct[] {
    return this.products.filter(product => product.restaurante.id === restauranteId);
  }

  /**
   * Retorna um produto pelo ID.
   * @param id ID do produto.
   */
  getProductById(id: number): IProduct | undefined {
    return this.products.find(product => product.id === id);
  }

  /**
   * Adiciona um novo produto.
   * @param product Produto a ser adicionado.
   */
  addProduct(product: IProduct): void {
    this.products.push(product);
  }

  /**
   * Atualiza um produto existente.
   * @param id ID do produto a ser atualizado.
   * @param updatedProduct Dados atualizados do produto.
   */
  updateProduct(id: number, updatedProduct: Partial<IProduct>): void {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct };
    }
  }

  /**
   * Remove um produto pelo ID.
   * @param id ID do produto a ser removido.
   */
  deleteProduct(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
  }
}