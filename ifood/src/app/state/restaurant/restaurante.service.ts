import { Inject, Injectable } from '@angular/core';
import { IRestaurant } from '../../restaurantes/lista-restaurantes/lista-restaurantes.page';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import type { Observable } from 'rxjs';
import type { IRestauranteDadosPayload } from './novo-restaurante.payload';

@Injectable({
  providedIn: 'root',
})
export class RestauranteService {
  constructor(@Inject(HttpClient) private readonly http: HttpClient) {}

  /**
   * Retorna todos os restaurantes.
   */
  getRestaurantes(): Observable<IRestaurant[]> {
    return this.http.get<IRestaurant[]>(environment.baseUrl + environment.restaurants);
  }

  /**
   * Retorna um restaurante pelo ID.
   * @param id ID do restaurante.
   */
  getRestauranteById(id: number): Observable<IRestaurant> {
    return this.http.get<IRestaurant>(`${environment.baseUrl + environment.restaurants}/${id}`);
  }

  /**
   * Adiciona um novo restaurante.
   * @param restaurante Restaurante a ser adicionado.
   */
  addRestaurante(restaurante: IRestauranteDadosPayload): Observable<IRestaurant> {
    return this.http.post<IRestaurant>(environment.baseUrl + environment.restaurants, restaurante);
  }

  /**
   * Atualiza um restaurante existente.
   *
   * @param restaurante 
   * @param id 
   * @returns 
   */
  atualizarRestaurante(restaurante: IRestauranteDadosPayload, id: number): Observable<IRestaurant> {
    return this.http.put<IRestaurant>(`${environment.baseUrl + environment.restaurants}/${id}`, restaurante);
  }

  /**
   * Remove um restaurante pelo ID.
   * @param id ID do restaurante a ser removido.
   */
  deleteRestaurante(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl + environment.restaurants}/${id}`);
  }
}