import type { IProduct } from "src/app/interfaces/entities/product";
import type { IBaseState } from "../base-state.interface";

export interface IProdutoStateModel extends IBaseState {
  lastProduto: IProduct | undefined;

  listaProdutos: IProduct[];
}
