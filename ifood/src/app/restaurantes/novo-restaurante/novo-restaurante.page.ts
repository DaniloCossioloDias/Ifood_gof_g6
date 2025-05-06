import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, type AbstractControl, type FormGroup } from '@angular/forms';
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
import { Store } from '@ngxs/store';
import type { IRestauranteDadosPayload } from 'src/app/state/restaurant/novo-restaurante.payload';
import { SalvarRestaurante } from 'src/app/state/restaurant/restaurante.actions';
import { catchError, of, switchMap, tap } from 'rxjs';

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
    IonFooter,
    ReactiveFormsModule
  ],
})
export class NovoRestaurantePage {
  public restaurante: IRestaurant | undefined;

  public readonly restauranteFormGroup: FormGroup;

  get nome(): AbstractControl | null {
    return this.restauranteFormGroup.get('nome');
  }
  
  get descricao(): AbstractControl | null {
    return this.restauranteFormGroup.controls['descricao'];
  }
  
  get endereco(): AbstractControl | null {
    return this.restauranteFormGroup.get('endereco');
  }

  constructor(
    @Inject(Router) private readonly router: Router,
    @Inject(RestauranteService) private readonly restauranteService: RestauranteService,
    @Inject(Store) private readonly store: Store,
    @Inject(FormBuilder) private readonly formBuilder: FormBuilder
  ) {
    this.restauranteFormGroup = this.inicializarFormGroup();
  }

  inicializarFormGroup(): FormGroup {
    return this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      endereco: ['', Validators.required]
    })
  }

  salvarRestaurante() {
    if (!this.nome || !this.endereco || !this.descricao) {
      return;
    }

    const payload: IRestauranteDadosPayload = {
      nome: this.nome.value,
      descricao: this.descricao.value,
      endereco: this.endereco.value,
    }

    this.store.dispatch(new SalvarRestaurante(payload))
      .pipe(
        tap(() => {
          console.log('Salvando restaurante')
        }),
        switchMap(() => {
          console.log('Restaurante criado:', this.restaurante);

          this.router.navigate(['/crud/restaurantes']);

          return of(this.restaurante);
        }),
        catchError((erro) => {
          console.error('Erro ao salvar restaurante');
          return of(erro);
        })
      )
  }
}