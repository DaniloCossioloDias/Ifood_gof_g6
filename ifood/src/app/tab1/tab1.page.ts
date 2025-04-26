import { Component, OnInit } from '@angular/core';
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
  IonAvatar,
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { RestauranteService } from 'src/app/services/restaurante.service';

export interface IRestaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  createdAt: Date;
}

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonButton,
    IonFab, 
    IonFabButton, 
    IonIcon,
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonCardContent
  ],
})
export class Tab1Page implements OnInit {
  restaurantes: IRestaurant[] = [];

  constructor(
    private restauranteService: RestauranteService,
    private router: Router 
  ) {}

  ngOnInit() {
    this.carregarRestaurantes();
  }

  carregarRestaurantes() {
    this.restaurantes = this.restauranteService.getRestaurantes();
  }

  abrirRestaurante() {
    this.router.navigate(['/crud/restaurantes']);
  }

  abrirProdutos(restaurante: any) {
    this.router.navigate(['/crud/produtos', restaurante.id], {
      state: { restaurante } 
    });
  }
}