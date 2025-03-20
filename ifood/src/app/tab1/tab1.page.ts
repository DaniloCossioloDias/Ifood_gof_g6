import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonAvatar, IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,       // Importando IonList
    IonItem,       // Importando IonItem
    IonAvatar,     // Importando IonAvatar
    IonLabel,      // Importando IonLabel
    CommonModule
  ],
})
export class Tab1Page {
  restaurantes = [
    {
      id: 1,
      nome: 'Pará Lanches',
      descricao: 'aaaaaaaa',
      imagem: 'assets/images/paraLanches.jpg',
      produtos: [
        { id: 1, nome: 'Prato 1', preco: 20.0 },
        { id: 2, nome: 'Prato 2', preco: 25.0 }
      ]
    },
    {
      id: 2,
      nome: 'Comeu Morreu',
      descricao: 'aaaaaaaaa',
      imagem: 'assets/images/comeuMorreu.jpg',
      produtos: [
        { id: 1, nome: 'Prato 1', preco: 15.0 },
        { id: 2, nome: 'Prato 2', preco: 30.0 }
      ]
    },
    {
      id: 3,
      nome: 'Churrasic Park',
      descricao: 'aaaaaaaaaa',
      imagem: 'assets/images/churrasicPark.jpg',
      produtos: [
        { id: 1, nome: 'Prato 1', preco: 35.0 },
        { id: 2, nome: 'Prato 2', preco: 40.0 }
      ]
    },
    {
      id: 4,
      nome: 'bomBARdeio',
      descricao: 'aaaaaaaaaa',
      imagem: 'assets/images/bomBARdeio.jpg',
      produtos: [
        { id: 1, nome: 'Prato 1', preco: 22.0 },
        { id: 2, nome: 'Prato 2', preco: 28.0 }
      ]
    },
    {
      id: 5,
      nome: 'Restaurante',
      descricao: 'aaaaaaaaaaaaaaa',
      imagem: 'assets/images/PaulMole.jpg',
      produtos: [
        { id: 1, nome: 'Prato 1', preco: 18.0 },
        { id: 2, nome: 'Prato 2', preco: 24.0 }
      ]
    }
  ];

  constructor(private router: Router) {}

  abrirRestaurante(restaurante: any) {
    this.router.navigate(['/produtos', restaurante.id], {
      state: { restaurante }  // Passando o objeto restaurante pelo estado
    });
  }
}
