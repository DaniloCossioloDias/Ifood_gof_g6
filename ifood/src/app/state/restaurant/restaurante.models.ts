import type { IRestaurant } from "src/app/restaurantes/lista-restaurantes/lista-restaurantes.page";
import type { IBaseState } from "../base-state.interface";

export interface IRestauranteStateModel extends IBaseState {
  lastRestaurante: IRestaurant | undefined;

  listaRestaurantes: IRestaurant[];
}
