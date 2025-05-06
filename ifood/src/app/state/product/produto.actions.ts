import type { INovoProdutoPayload } from "./novo-produto.payload"

export class GetProducts {
  static readonly type = '[Product] GetProducts'
}

export class GetProductsByRestaurant {
  static readonly type = '[Product] GetProductsByRestaurant'

  constructor(public restaurantId: number) {}
}

export class GetProductById {
  static readonly type = '[Product] GetProductById'

  constructor(public id: number) {}
}

export class AddProduct {
  static readonly type = '[Product] AddProduct'

  constructor(public payload: INovoProdutoPayload) {}
}

export class UpdateProduct {
  static readonly type = '[Product] UpdateProduct'

  constructor(public payload: INovoProdutoPayload, public id: number) {}
}

export class DeleteProduct {
  static readonly type = '[Product] DeleteProduct'

  constructor(public id: number) {}
}
