import { Injectable } from '@angular/core';
import { IProduct } from 'src/app/interfaces/entities/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private carrinho: { produto: IProduct; quantidade: number }[] = []; // Carrinho com produtos e quantidades

  /**
   * Adiciona um produto ao carrinho.
   * Se o produto já existir, incrementa a quantidade.
   * @param produto Produto a ser adicionado.
   */
  adicionarAoCarrinho(produto: IProduct) {
    const itemExistente = this.carrinho.find(
      (item) => item.produto.id === produto.id
    );

    if (itemExistente) {
      itemExistente.quantidade += 1; // Incrementa a quantidade
    } else {
      this.carrinho.push({ produto, quantidade: 1 }); // Adiciona o produto com quantidade inicial
    }
  }

  /**
   * Atualiza o carrinho com uma nova lista de itens.
   * @param carrinho Nova lista de itens do carrinho.
   */
  atualizarCarrinho(carrinho: { produto: IProduct; quantidade: number }[]) {
    this.carrinho = carrinho;
  }

  /**
   * Obtém os produtos do carrinho.
   * @returns Lista de produtos no carrinho.
   */
  getCarrinho() {
    return this.carrinho;
  }

  /**
   * Calcula o total do carrinho.
   * @returns Total do carrinho.
   */
  getTotal() {
    return this.carrinho.reduce(
      (total, item) => total + item.produto.price * item.quantidade,
      0
    );
  }

  /**
   * Remove um produto do carrinho.
   * @param index Índice do produto a ser removido.
   */
  removerDoCarrinho(index: number) {
    this.carrinho.splice(index, 1); // Remove o produto pelo índice
  }

  /**
   * Limpa o carrinho.
   */
  limparCarrinho() {
    this.carrinho = [];
  }
}