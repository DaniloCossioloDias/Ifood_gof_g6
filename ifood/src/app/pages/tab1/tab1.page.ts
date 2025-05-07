import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import type { IRestaurant } from 'src/app/restaurantes/lista-restaurantes/lista-restaurantes.page';
import { Store } from '@ngxs/store';
import { GetRestaurantes } from 'src/app/state/restaurant/restaurante.actions';
import { catchError, of, switchMap, tap } from 'rxjs';
import { RestauranteState } from 'src/app/state/restaurant/restaurante.state';

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
    IonAvatar
  ]
})
export class Tab1Page implements OnInit {
  restaurantes: IRestaurant[] = [];

  constructor(
    @Inject(Store) private readonly store: Store,
    @Inject(Router) private readonly router: Router
  ) {}

  ngOnInit() {
    console.log('Tab1Page: ngOnInit');
    this.fetchRestaurantes();
  }

  ionViewWillEnter() {
    console.log('>>> Tab1Page: ionViewWillEnter EXECUTADO <<<'); 
    this.fetchRestaurantes();
  }

  fetchRestaurantes() {
    this.store.dispatch(new GetRestaurantes())
      .pipe(
        tap(() => {
          console.log('Carregando restaurantes.')
        }),
        switchMap(() => {
          console.log('Restaurantes carregados');
          this.restaurantes = this.store.selectSnapshot(RestauranteState.getListaRestaurantes);
          return of(this.restaurantes);
        }),
        catchError((erro) => {
          console.error(erro);
          return of(erro);
        })
      ).subscribe();
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