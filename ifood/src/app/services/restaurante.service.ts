import { Injectable } from '@angular/core';
import { IRestaurant } from '../restaurantes/lista-restaurantes/lista-restaurantes.page';

@Injectable({
  providedIn: 'root',
})

//restaurantes gerados pelo gpt, tem q mudar aqui pra adicionar o backend provavelmente
export class RestauranteService {
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

  getRestaurantes(): IRestaurant[] {
    return this.restaurantes;
  }


  addRestaurante(restaurante: IRestaurant): void {
    this.restaurantes.push(restaurante);
  }
}