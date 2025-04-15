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
  IonAvatar 
} from '@ionic/angular/standalone';
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
  ],
})
export class Tab1Page implements OnInit {
  restaurantes: IRestaurant[] = [];

  constructor(private restauranteService: RestauranteService) {}

  ngOnInit() {
    this.carregarRestaurantes();
  }

  carregarRestaurantes() {
    this.restaurantes = this.restauranteService.getRestaurantes();
  }
}