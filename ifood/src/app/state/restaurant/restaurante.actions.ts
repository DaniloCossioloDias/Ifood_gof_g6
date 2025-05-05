import type { IRestauranteDadosPayload } from "./novo-restaurante.payload"

export class GetRestaurantes {
  static readonly type = '[Restaurante] GetRestaurantes'
}

export class GetRestauranteById {
  static readonly type = '[Restaurante] GetRestauranteById'

  constructor(public id: number) {}
}

export class SalvarRestaurante {
  static readonly type = '[Restaurante] SalvarRestaurante'

  constructor(public payload: IRestauranteDadosPayload) {}
}

export class AtualizarRestaurante {
  static readonly type = '[Restaurante] AtualizarRestaurante'

  constructor(public payload: IRestauranteDadosPayload, public id: number) {}
}

export class DeleteRestaurante {
  static readonly type = '[Restaurante] DeleteRestaurante'

  constructor(public id: number) {}
}
