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
  ],
})
export class EditarRestaurantePage {
  restaurante: Partial<IRestaurant> = {
    name: '',
    description: '',
    address: '',
    createdAt: new Date(),
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restauranteService: RestauranteService
  ) {}

  ngOnInit() {
    this.carregarRestaurante();
  }

  carregarRestaurante() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const restaurante = this.restauranteService.getRestaurantes().find(r => r.id === id);

    if (restaurante) {
      this.restaurante = { ...restaurante };
    } else {
      console.error('Restaurante não encontrado!');
      this.router.navigate(['/crud/restaurantes']);
    }
  }

  salvarAlteracoes() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const index = this.restauranteService.getRestaurantes().findIndex(r => r.id === id);

    if (index !== -1) {
      this.restauranteService.getRestaurantes()[index] = { ...this.restaurante } as IRestaurant;
      console.log('Restaurante atualizado:', this.restaurante);
      this.router.navigate(['/crud/restaurantes']);
    } else {
      console.error('Erro ao salvar alterações!');
    }
  }
}