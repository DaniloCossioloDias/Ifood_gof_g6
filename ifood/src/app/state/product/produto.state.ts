import type { HttpErrorResponse } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { State, Selector, Action, StateContext } from "@ngxs/store";
import { lastValueFrom } from "rxjs";
import type { IProdutoStateModel } from "./produto.models";
import type { IProduct } from "src/app/interfaces/entities/product";
import { AddProduct, DeleteProduct, GetProductById, GetProducts, GetProductsByRestaurant } from "./produto.actions";
import { ProductRepository } from "./product.repository";

@State<IProdutoStateModel>({
  name: 'produto',
  defaults: {
    lastProduto: undefined,
    listaProdutos: [],
    carregando: false,
    erro: undefined
  }
})
@Injectable()
export class ProdutoState {
  constructor(@Inject(ProductRepository) private readonly productService: ProductRepository) {}

  @Selector()
  static getLastProduto(state: IProdutoStateModel): IProduct | undefined {
    return state.lastProduto;
  }

  @Selector()
  static getListaProdutos(state: IProdutoStateModel): IProduct[] {
    return state.listaProdutos;
  }

  @Action(GetProducts)
  async getRestaurantes({ patchState }: StateContext<IProdutoStateModel>): Promise<void> {
    patchState({ carregando: true, erro: undefined });
    await lastValueFrom(this.productService
      .getProducts())
      .then((listaProdutos: IProduct[]) => {
        patchState({ listaProdutos });
      })
      .catch((erro: HttpErrorResponse) => {
        console.error(erro);
        patchState({ erro });
      })
      .finally(() => patchState({ carregando: false }))
  }

  @Action(GetProductsByRestaurant)
  async getProductsByRestaurant({ patchState }: StateContext<IProdutoStateModel>, action: GetProductsByRestaurant): Promise<void> {
    patchState({ carregando: true, erro: undefined });
    await lastValueFrom(this.productService
      .getProductsByRestaurant(action.restaurantId))
      .then((listaProdutos: IProduct[]) => {
        patchState({ listaProdutos: listaProdutos });
      })
      .catch((erro: HttpErrorResponse) => {
        console.error(erro);
        patchState({ erro });
      })
      .finally(() => patchState({ carregando: false }))
  }

  @Action(GetProductById)
  async getRestauranteById({ patchState }: StateContext<IProdutoStateModel>, action: GetProductById): Promise<void> {
    patchState({ carregando: true, erro: undefined });
    await lastValueFrom(this.productService
      .getProductById(action.id))
      .then((product: IProduct) => {
        patchState({ lastProduto: product });
      })
      .catch((erro: HttpErrorResponse) => {
        console.error(erro);
        patchState({ erro });
      })
      .finally(() => patchState({ carregando: false }))
  }

  @Action(AddProduct)
  async addProduct({ patchState }: StateContext<IProdutoStateModel>, action: AddProduct): Promise<void> {
    patchState({ carregando: true, erro: undefined });
    await lastValueFrom(this.productService
      .addProduct(action.payload, action.restaurantId))
      .then((product: IProduct) => {
        patchState({ lastProduto: product });
      })
      .catch((erro: HttpErrorResponse) => {
        console.error(erro);
        patchState({ erro });
      })
      .finally(() => patchState({ carregando: false }))
  }

  @Action(DeleteProduct)
  async deleteProduct({ patchState }: StateContext<IProdutoStateModel>, action: DeleteProduct): Promise<void> {
    patchState({ carregando: true, erro: undefined });
    await lastValueFrom(this.productService
      .deleteProduct(action.id))
      .then(() => {})
      .catch((erro: HttpErrorResponse) => {
        console.error(erro);
        patchState({ erro });
      })
      .finally(() => patchState({ carregando: false }))
  }
}