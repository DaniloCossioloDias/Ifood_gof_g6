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
  IonButtons,
  IonFab,
  IonFabButton,
  IonBackButton,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';
import { Store } from '@ngxs/store';
import { DeleteRestaurante, GetRestaurantes } from 'src/app/state/restaurant/restaurante.actions';
import { RestauranteState } from 'src/app/state/restaurant/restaurante.state';

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
    @Inject(Router) private readonly router: Router,
    @Inject(Store) private readonly store: Store
  ) {}

  ngOnInit() {
    this.atualizarListaRestaurantes();
  }

  ionViewWillEnter() {
    this.atualizarListaRestaurantes();
  }

  async atualizarListaRestaurantes() {
    this.store.dispatch(new GetRestaurantes())
      .pipe(
        tap(() => {
          console.log('Carregando restaurantes');
        }),
        switchMap(() => {
          this.restaurantes = this.store.selectSnapshot(RestauranteState.getListaRestaurantes);
          console.log('Produtos carregados:', this.restaurantes);
          return of(this.restaurantes);
        }),
        catchError((erro) => {
          console.error(erro);
          return of(erro);
        })
      ).subscribe();
  }

  novoRestaurante() {
    this.router.navigate(['/crud/restaurante/new']);
  }

  editarRestaurante(id: number) {
    this.router.navigate(['/crud/restaurante', id]);
  }

  excluirRestaurante(id: number) {
    this.store.dispatch(new DeleteRestaurante(id))
      .pipe(
        tap(() => {
          console.log('Excluindo restaurante ID:', id);
        }),
        switchMap(() => {
          console.log('restaurante Excluido ID:', id);
          return of(null);
        }),
        catchError((erro) => {
          console.error(erro);
          return of(erro);
        }),
        finalize(() => {
          this.atualizarListaRestaurantes();
        })
      ).subscribe();
  }
}