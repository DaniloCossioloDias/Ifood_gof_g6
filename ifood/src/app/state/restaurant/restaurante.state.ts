import { Inject, Injectable } from "@angular/core";
import { Action, Selector, State, type StateContext } from "@ngxs/store";
import type { IRestauranteStateModel } from "./restaurante.models";
import { RestauranteService } from "./restaurante.service";
import type { IRestaurant } from "src/app/restaurantes/lista-restaurantes/lista-restaurantes.page";
import { DeleteRestaurante, GetRestauranteById, GetRestaurantes, SalvarRestaurante } from "./restaurante.actions";
import { lastValueFrom } from "rxjs";
import type { HttpErrorResponse } from "@angular/common/http";

@State<IRestauranteStateModel>({
  name: 'restaurante',
  defaults: {
    lastRestaurante: undefined,
    listaRestaurantes: [],
    carregando: false,
    erro: undefined
  }
})
@Injectable()
export class RestauranteState {
  constructor(@Inject(RestauranteService) private readonly restauranteService: RestauranteService) {}

  @Selector()
  static getLastRestaurante(state: IRestauranteStateModel): IRestaurant | undefined {
    return state.lastRestaurante;
  }

  @Selector()
  static getListaRestaurantes(state: IRestauranteStateModel): IRestaurant[] {
    return state.listaRestaurantes;
  }

  @Action(GetRestaurantes)
  async getRestaurantes({ patchState }: StateContext<IRestauranteStateModel>): Promise<void> {
    patchState({ carregando: true, erro: undefined });
    await lastValueFrom(this.restauranteService
      .getRestaurantes())
      .then((listaRestaurantes: IRestaurant[]) => {
        patchState({ listaRestaurantes });
      })
      .catch((erro: HttpErrorResponse) => {
        console.error(erro);
        patchState({ erro });
      })
      .finally(() => patchState({ carregando: false }))
  }

  @Action(GetRestauranteById)
  async getRestauranteById({ patchState }: StateContext<IRestauranteStateModel>, action: GetRestauranteById): Promise<void> {
    patchState({ carregando: true, erro: undefined });
    await lastValueFrom(this.restauranteService
      .getRestauranteById(action.id))
      .then((restaurante: IRestaurant) => {
        patchState({ lastRestaurante: restaurante });
      })
      .catch((erro: HttpErrorResponse) => {
        console.error(erro);
        patchState({ erro });
      })
      .finally(() => patchState({ carregando: false }))
  }

  @Action(SalvarRestaurante)
  async salvarRestaurante({ patchState }: StateContext<IRestauranteStateModel>, action: SalvarRestaurante): Promise<void> {
    patchState({ carregando: true, erro: undefined });
    await lastValueFrom(this.restauranteService
      .addRestaurante(action.payload))
      .then((restaurante: IRestaurant) => {
        patchState({ lastRestaurante: restaurante });
      })
      .catch((erro: HttpErrorResponse) => {
        console.error(erro);
        patchState({ erro });
      })
      .finally(() => patchState({ carregando: false }))
  }

  @Action(DeleteRestaurante)
  async deleteRestaurante({ patchState }: StateContext<IRestauranteStateModel>, action: DeleteRestaurante): Promise<void> {
    patchState({ carregando: true, erro: undefined });
    await lastValueFrom(this.restauranteService
      .deleteRestaurante(action.id))
      .then(() => {})
      .catch((erro: HttpErrorResponse) => {
        console.error(erro);
        patchState({ erro });
      })
      .finally(() => patchState({ carregando: false }))
  }
}