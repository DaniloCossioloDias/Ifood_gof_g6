import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonThumbnail,
  IonFooter
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

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
    IonIcon,
    IonThumbnail,
    IonFooter,
    CommonModule,
    FormsModule
  ]
})
export class Tab2Page implements OnInit {
  carrinho: { produto: any; quantidade: number }[] = [];
  total: number = 0;

  constructor(
    @Inject(CartService) private readonly cartService: CartService,
    @Inject(Router) private readonly router: Router
  ) {}

  ngOnInit() {
    this.atualizarCarrinho();
  }

  ionViewWillEnter() {
    this.atualizarCarrinho();
  }

  atualizarCarrinho() {
    this.carrinho = this.cartService.getCarrinho();
    this.total = this.cartService.getTotal();
  }

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

  adicionarQuantidade(index: number) {
    this.carrinho[index].quantidade += 1;
    this.cartService.atualizarCarrinho(this.carrinho);
    this.atualizarCarrinho();
  }

  removerProduto(index: number) {
    this.cartService.removerDoCarrinho(index);
    this.atualizarCarrinho();
  }

  irParaPagamento() {
    this.router.navigate(['/pagamento']);
  }
}