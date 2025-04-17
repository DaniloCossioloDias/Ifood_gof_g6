import { Injectable } from '@angular/core';
import { IRestaurant } from '../restaurantes/lista-restaurantes/lista-restaurantes.page';

@Injectable({
  providedIn: 'root',
})
export class RestauranteService {

  //dados gerados pelo gpt acredito q quando for adicionar o backend vai ter q mudar aqui
  private restaurantes: IRestaurant[] = [
    {
      id: 1,
      name: 'Restaurante A',
      description: 'Um restaurante incrível com pratos deliciosos.',
      address: 'Londrina, Paraná, Rua Belém, 133 - Centro',
      createdAt: new Date('2023-01-01'),
    },
    {
      id: 2,
      name: 'Restaurante B',
      description: 'Comida caseira com um toque especial.',
      address: 'Curitiba, Paraná, Rua XV de Novembro, 456 - Centro',
      createdAt: new Date('2023-02-15'),
    },
  ];

  constructor() {}

  /**
   * Retorna todos os restaurantes.
   */
  getRestaurantes(): IRestaurant[] {
    return this.restaurantes;
  }

  /**
   * Adiciona um novo restaurante.
   * @param restaurante Restaurante a ser adicionado.
   */
  addRestaurante(restaurante: IRestaurant): void {
    this.restaurantes.push(restaurante);
  }

  /**
   * Remove um restaurante pelo ID.
   * @param id ID do restaurante a ser removido.
   */
  deleteRestaurante(id: number): void {
    this.restaurantes = this.restaurantes.filter(restaurante => restaurante.id !== id);
  }
}