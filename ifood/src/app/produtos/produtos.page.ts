import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { IonNav } from '@ionic/angular/standalone';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonItem, CommonModule]
})
export class ProdutosPage implements OnInit {
  restaurante: any;
  produtos: any[] | undefined;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Acessar o estado da navegação
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.restaurante = navigation.extras.state['restaurante'];  // Acessando o restaurante do estado
      this.produtos = this.restaurante.produtos;
    }
  }
}
