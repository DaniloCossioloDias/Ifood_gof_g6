import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { IRestaurant } from '../restaurantes/lista-restaurantes/lista-restaurantes.page';
import { RestauranteService } from '../services/restaurante.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonFab,
    IonFabButton,
    IonIcon
  ]
})
export class Tab1Page implements OnInit {
  restaurantes: IRestaurant[] = [];

  constructor(
    private restauranteService: RestauranteService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('Tab1Page: ngOnInit');
  }

  ionViewWillEnter() {
    console.log('>>> Tab1Page: ionViewWillEnter EXECUTADO <<<'); 
    this.carregarRestaurantes();
  }

  carregarRestaurantes() {
    console.log('Tab1Page: Chamando restauranteService.getRestaurantes()');
    this.restaurantes = this.restauranteService.getRestaurantes();
    console.log('Tab1Page: Restaurantes carregados na Tab1:', this.restaurantes.length);
  }

  abrirRestaurante() {
    this.router.navigate(['/crud/restaurantes']);
  }

  abrirProdutos(restaurante: IRestaurant) {
    console.log('Tab1Page: Abrindo produtos para:', restaurante.name, 'ID:', restaurante.id);
    this.router.navigate(['/crud/produtos', restaurante.id], {
      state: { restaurante }
    });
  }
}