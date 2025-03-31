import { Component, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CartService } from '../services/cart.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonIcon, IonButton} from '@ionic/angular/standalone';
import { IonNav } from '@ionic/angular/standalone';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent, IonIcon, IonLabel, IonList, IonItem, IonButton, CommonModule]
})
export class Tab2Page {

  carrinho: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.atualizarCarrinho();
  }

  atualizarCarrinho() {
    this.carrinho = this.cartService.getCarrinho();
    this.total = this.cartService.getTotal();
  }

  removerProduto(index: number) {
    this.cartService.removerDoCarrinho(index);
    this.atualizarCarrinho();
  }
  

}
