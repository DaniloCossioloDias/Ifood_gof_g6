import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonButton 
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonLabel, 
    IonList, 
    IonItem, 
    IonButton, 
    CommonModule
  ]
})
export class Tab2Page implements OnInit {
  carrinho: { produto: any; quantidade: number }[] = [];
  total: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.atualizarCarrinho(); 
  }

  ionViewWillEnter() {
    this.atualizarCarrinho(); 
  }

  /**
   * Atualiza os itens do carrinho e o total.
   */
  atualizarCarrinho() {
    this.carrinho = this.cartService.getCarrinho();
    this.total = this.cartService.getTotal(); // Atualiza o total
  }

  /**
   * Remove uma unidade da quantidade de um produto.
   * @param index Índice do produto no carrinho.
   */
  removerQuantidade(index: number) {
    const item = this.carrinho[index];
    if (item.quantidade > 1) {
      item.quantidade -= 1; 
    } else {
      this.removerProduto(index); 
    }
    this.cartService.atualizarCarrinho(this.carrinho); 
    this.atualizarCarrinho();
  }

  /**
   * Adiciona uma unidade à quantidade de um produto.
   * @param index Índice do produto no carrinho.
   */
  adicionarQuantidade(index: number) {
    this.carrinho[index].quantidade += 1;
    this.cartService.atualizarCarrinho(this.carrinho); 
    this.atualizarCarrinho(); 
  }

  /**
   * Remove um produto inteiro do carrinho.
   * @param index Índice do produto a ser removido.
   */
  removerProduto(index: number) {
    this.cartService.removerDoCarrinho(index);
    this.atualizarCarrinho();
  }

  irParaPagamento() {
    this.router.navigate(['/pagamento']);
  }
}