import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular'; 
import { CartService } from '../services/cart.service'; 
import { ProductService } from '../services/product.service'; // Importação do ProductService
import { IProduct } from '../interfaces/entities/product';
import { IRestaurant } from '../interfaces/entities/restaurant';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.page.html',
  styleUrls: ['./produtos.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]  
})
export class ProdutosPage implements OnInit {
  restaurante: IRestaurant | undefined;
  produtos: IProduct[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    private productService: ProductService // Injeção do ProductService
  ) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.restaurante = navigation.extras.state['restaurante'];
      if (this.restaurante) {
        this.carregarProdutos(this.restaurante.id);
      }
    }
  }

  carregarProdutos(restauranteId: number) {
    this.produtos = this.productService.getProductsByRestaurant(restauranteId);
  }

  adicionarAoCarrinho(produto: IProduct) {
    this.cartService.adicionarAoCarrinho(produto);
  }
}