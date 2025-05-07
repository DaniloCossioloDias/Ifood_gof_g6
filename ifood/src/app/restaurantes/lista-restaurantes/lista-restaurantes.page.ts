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
  IonButton,
  IonIcon,
  IonButtons,
  IonFab,
  IonFabButton,
  IonBackButton,
  IonListHeader
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { RestauranteService } from 'src/app/state/restaurant/restaurante.service';
import { lastValueFrom } from 'rxjs';

export interface IRestaurant {
  id: number;
  name: string;
  description: string;
  address: string;
  createdAt: Date;
}

@Component({
  selector: 'app-lista-restaurantes',
  templateUrl: './lista-restaurantes.page.html',
  styleUrls: ['./lista-restaurantes.page.scss'],
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
    IonButton,
    IonIcon,
    IonButtons,
    IonFab,
    IonFabButton,
    IonBackButton
  ],
})
export class ListaRestaurantesPage implements OnInit {
  restaurantes: IRestaurant[] = [];

  constructor(
    private router: Router,
    private restauranteService: RestauranteService
  ) {}

  ngOnInit() {
    this.atualizarListaRestaurantes();
  }

  ionViewWillEnter() {
    this.atualizarListaRestaurantes();
  }

  async atualizarListaRestaurantes() {
    this.restaurantes = await lastValueFrom(this.restauranteService.getRestaurantes());
  }

  novoRestaurante() {
    this.router.navigate(['/crud/restaurante/new']);
  }

  editarRestaurante(id: number) {
    this.router.navigate(['/crud/restaurante', id]);
  }

  excluirRestaurante(id: number) {
    console.log('Excluindo restaurante ID:', id);
    this.restauranteService.deleteRestaurante(id);
    this.atualizarListaRestaurantes();
  }
}