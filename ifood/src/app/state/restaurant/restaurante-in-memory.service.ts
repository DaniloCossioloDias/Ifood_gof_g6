import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IRestaurant } from '../../restaurantes/lista-restaurantes/lista-restaurantes.page';
import { IRestauranteDadosPayload } from './novo-restaurante.payload';
import { RestauranteRepository } from './restaurante.repository';

@Injectable()
export class RestauranteInMemoryService extends RestauranteRepository {
  private restaurantes: IRestaurant[] = [];
  private idCounter = 1;

  getRestaurantes() {
    return of(this.restaurantes);
  }

  getRestauranteById(id: number) {
    return of(this.restaurantes.find(r => r.id === id)!);
  }

  addRestaurante(payload: IRestauranteDadosPayload) {
    const novo: IRestaurant = {
      id: this.idCounter++,
      name: payload.nome,
      description: payload.descricao,
      address: payload.endereco,
      createdAt: new Date()
    };
    this.restaurantes.push(novo);
    return of(novo);
  }

  atualizarRestaurante(payload: IRestauranteDadosPayload, id: number) {
    const index = this.restaurantes.findIndex(r => r.id === id);
    if (index !== -1) {
      this.restaurantes[index] = { ...this.restaurantes[index], ...payload };
    }
    return of(this.restaurantes[index]);
  }

  deleteRestaurante(id: number) {
    this.restaurantes = this.restaurantes.filter(r => r.id !== id);
    return of(void 0);
  }
}
