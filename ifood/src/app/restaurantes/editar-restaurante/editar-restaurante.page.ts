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
  IonInput,
  IonButton,
  IonTextarea,
  IonButtons,
  IonBackButton,
  IonFooter
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { IRestaurant } from '../lista-restaurantes/lista-restaurantes.page';

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
    IonFooter
  ],
})
export class EditarRestaurantePage implements OnInit {
  restaurante: Partial<IRestaurant> = {};
  private restauranteId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restauranteService: RestauranteService
  ) {}

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

  carregarRestaurante(id: number) {
    console.log('Carregando restaurante para edição, ID:', id);
    const restauranteEncontrado = this.restauranteService.getRestaurantes().find(r => r.id === id);

    if (restauranteEncontrado) {
      this.restaurante = { ...restauranteEncontrado };
      console.log('Restaurante carregado:', this.restaurante);
    } else {
      console.error('Restaurante com ID', id, 'não encontrado!');
      this.restaurante = {};
    }
  }

  salvarAlteracoes() {
    if (this.restauranteId === null) {
       console.error('Erro ao salvar: ID do restaurante é inválido.');
       return;
    }

    const listaDoServico = this.restauranteService.getRestaurantes();
    const index = listaDoServico.findIndex(r => r.id === this.restauranteId);

    if (index !== -1) {
      listaDoServico[index] = { ...this.restaurante } as IRestaurant;
      console.log('Restaurante atualizado (direto no array do serviço):', this.restaurante);
      this.router.navigate(['/crud/restaurantes']);
    } else {
      console.error('Erro ao salvar alterações: Restaurante não encontrado no array do serviço!');
    }
  }
}