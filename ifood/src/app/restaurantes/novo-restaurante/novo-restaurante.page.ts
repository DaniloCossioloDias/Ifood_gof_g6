import { Component } from '@angular/core';
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
  IonInput,
  IonButton,
  IonTextarea,
  IonButtons,
  IonBackButton,
  IonFooter
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { IRestaurant } from '../lista-restaurantes/lista-restaurantes.page';
import { RestauranteService } from 'src/app/state/restaurant/restaurante.service';

@Component({
  selector: 'app-novo-restaurante',
  templateUrl: './novo-restaurante.page.html',
  styleUrls: ['./novo-restaurante.page.scss'],
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
    IonInput,
    IonButton,
    IonTextarea,
    IonButtons,
    IonBackButton,
    IonFooter
  ],
})
export class NovoRestaurantePage {
  restaurante: Partial<IRestaurant> = {
    name: '',
    description: '',
    address: '',
  };

  constructor(
    private router: Router,
    private restauranteService: RestauranteService
  ) {}

  salvarRestaurante() {
    if (!this.restaurante.name || !this.restaurante.address) {
      console.error('Nome e Endereço são obrigatórios!');
      return;
    }

    const novoRestauranteParaSalvar: IRestaurant = {
      id: Date.now(),
      name: this.restaurante.name!,
      description: this.restaurante.description || '',
      address: this.restaurante.address!,
      createdAt: new Date(),
    };

    console.log('Salvando restaurante:', novoRestauranteParaSalvar);
    this.restauranteService.addRestaurante(novoRestauranteParaSalvar);

    this.router.navigate(['/crud/restaurantes']);
  }
}