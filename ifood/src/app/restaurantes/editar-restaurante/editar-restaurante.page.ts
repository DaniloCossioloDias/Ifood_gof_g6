import { Component, Inject, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
import { IRestaurant } from '../lista-restaurantes/lista-restaurantes.page';
import { Store } from '@ngxs/store';
import { AtualizarRestaurante, GetRestauranteById } from 'src/app/state/restaurant/restaurante.actions';
import { catchError, of, switchMap, tap } from 'rxjs';
import { RestauranteState } from 'src/app/state/restaurant/restaurante.state';
import type { IRestauranteDadosPayload } from 'src/app/state/restaurant/novo-restaurante.payload';

@Component({
  selector: 'app-editar-restaurante',
  templateUrl: './editar-restaurante.page.html',
  styleUrls: ['./editar-restaurante.page.scss'],
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
export class EditarRestaurantePage implements OnInit {
  public restaurante: IRestaurant | undefined;

  private restauranteId: number | null = null;

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
    @Inject(ActivatedRoute) private readonly route: ActivatedRoute,
    @Inject(Router) private readonly router: Router,
    @Inject(Store) private readonly store: Store,
    @Inject(FormBuilder) private readonly formBuilder: FormBuilder
  ) {
    this.restauranteFormGroup = this.inicializarFormGroup();
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.restauranteId = Number(idParam);
      this.carregarRestaurante(this.restauranteId);
    } else {
      console.error('ID do restaurante não encontrado na rota!');
      this.router.navigate(['/crud/restaurantes']);
    }
  }

  inicializarFormGroup(): FormGroup {
    return this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      endereco: ['', Validators.required]
    })
  }

  carregarFormGroup(restaurante: IRestaurant) {
    this.restauranteFormGroup.patchValue({
      nome: restaurante.name,
      descricao: restaurante.description,
      endereco: restaurante.address
    })
  }

  carregarRestaurante(id: number) {
    console.log('Carregando restaurante para edição, ID:', id);
    this.store.dispatch(new GetRestauranteById(id))
      .pipe(
        tap(() => {
          console.log('Carregando restaurante')
        }),
        switchMap(() => {
          this.restaurante = this.store.selectSnapshot(RestauranteState.getLastRestaurante);
          console.log('Restaurante carregado:', this.restaurante);

          if (this.restaurante)
            this.carregarFormGroup(this.restaurante);

          return of(this.restaurante);
        }),
        catchError((erro) => {
          console.error('Restaurante com ID', id, 'não encontrado!');
          return of(erro);
        })
      );
    }

  salvarAlteracoes() {
    if (this.restauranteId === null) {
       console.error('Erro ao salvar: ID do restaurante é inválido.');
       return;
    }

    if (!this.nome || !this.endereco || !this.descricao || !this.restaurante) {
      return;
    }

    const payload: IRestauranteDadosPayload = {
      nome: this.nome.value,
      descricao: this.descricao.value,
      endereco: this.endereco.value,
    }
    this.store.dispatch(new AtualizarRestaurante(payload, this.restaurante.id))
      .pipe(
        tap(() => {
          console.log('Carregando restaurante')
        }),
        switchMap(() => {
          console.log('Restaurante atualizado (direto no array do serviço):', this.restaurante);

          this.router.navigate(['/crud/restaurantes']);

          return of(this.restaurante);
        }),
        catchError((erro) => {
          console.error('Erro ao salvar alterações: Restaurante não encontrado no array do serviço!');
          return of(erro);
        })
      )
  }
}