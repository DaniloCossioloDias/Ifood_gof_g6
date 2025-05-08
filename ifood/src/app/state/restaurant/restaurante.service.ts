import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRestaurant } from '../../restaurantes/lista-restaurantes/lista-restaurantes.page';
import { IRestauranteDadosPayload } from './novo-restaurante.payload';
import { RestauranteRepository } from './restaurante.repository';

@Injectable({
  providedIn: 'root'
})
export class RestauranteHttpService extends RestauranteRepository {
  constructor(private readonly http: HttpClient) {
    super();
  }

  getRestaurantes(): Observable<IRestaurant[]> {
    return this.http.get<IRestaurant[]>(environment.baseUrl + environment.restaurants);
  }

  getRestauranteById(id: number): Observable<IRestaurant> {
    return this.http.get<IRestaurant>(`${environment.baseUrl + environment.restaurants}/${id}`);
  }

  addRestaurante(restaurante: IRestauranteDadosPayload): Observable<IRestaurant> {
    return this.http.post<IRestaurant>(environment.baseUrl + environment.restaurants, restaurante);
  }

  atualizarRestaurante(restaurante: IRestauranteDadosPayload, id: number): Observable<IRestaurant> {
    return this.http.put<IRestaurant>(`${environment.baseUrl + environment.restaurants}/${id}`, restaurante);
  }

  deleteRestaurante(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl + environment.restaurants}/${id}`);
  }
}
