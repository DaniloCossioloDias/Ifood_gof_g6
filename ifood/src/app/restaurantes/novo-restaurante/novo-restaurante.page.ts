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
  IonTextarea 
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { IRestaurant } from '../lista-restaurantes/lista-restaurantes.page';
import { RestauranteService } from 'src/app/services/restaurante.service';

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
  ],
})
export class NovoRestaurantePage {
  restaurante: Partial<IRestaurant> = {
    name: '',
    description: '',
    address: '',
    createdAt: new Date(),
  };

  constructor(
    private router: Router,
    private restauranteService: RestauranteService
  ) {}

  salvarRestaurante() {
    const novoRestaurante: IRestaurant = {
      id: Date.now(),
      name: this.restaurante.name!,
      description: this.restaurante.description!,
      address: this.restaurante.address!,
      createdAt: new Date(),
    };

    this.restauranteService.addRestaurante(novoRestaurante);

    this.router.navigate(['/crud/restaurantes']);
  }
}