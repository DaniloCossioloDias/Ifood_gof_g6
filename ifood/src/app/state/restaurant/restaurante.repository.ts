import { Observable } from 'rxjs';
import { IRestaurant } from '../../restaurantes/lista-restaurantes/lista-restaurantes.page';
import { IRestauranteDadosPayload } from './novo-restaurante.payload';

export abstract class RestauranteRepository {
  abstract getRestaurantes(): Observable<IRestaurant[]>;
  abstract getRestauranteById(id: number): Observable<IRestaurant>;
  abstract addRestaurante(restaurante: IRestauranteDadosPayload): Observable<IRestaurant>;
  abstract atualizarRestaurante(restaurante: IRestauranteDadosPayload, id: number): Observable<IRestaurant>;
  abstract deleteRestaurante(id: number): Observable<void>;
}
