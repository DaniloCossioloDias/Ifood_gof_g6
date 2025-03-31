import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CartService {
  private carrinho: any[] = [];

  adicionarAoCarrinho(produto: any) {
    this.carrinho.push(produto);
  }

  getCarrinho(): any[] {
    return this.carrinho;
  }

  removerDoCarrinho(index: number) {
    this.carrinho.splice(index, 1);
  }

  getTotal(): number {
    return this.carrinho.reduce((soma, item) => soma + item.preco, 0);
  }
}
