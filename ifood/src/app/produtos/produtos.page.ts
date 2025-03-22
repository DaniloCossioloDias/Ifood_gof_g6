import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular'; 
import { CartService } from '../services/cart.service'; 

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]  
})
export class ProdutosPage implements OnInit {
  restaurante: any;
  produtos: any[] | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private cartService: CartService) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.restaurante = navigation.extras.state['restaurante'];
      this.produtos = this.restaurante.produtos;
    }
  }


  adicionarAoCarrinho(produto: any) {
    this.cartService.adicionarAoCarrinho(produto);
  }
}
