import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; 
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/interfaces/entities/product';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.page.html',
  styleUrls: ['./novo-produto.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
  ],
})
export class NovoProdutoPage implements OnInit {
  produto: IProduct = {
    id: 0,
    restaurante: {
      id: 0,
      name: '',
      description: '',
      address: '',
      createdAt: new Date(),
    },
    name: '',
    description: '',
    price: 0,
    available: false,
    createdAt: new Date(),
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    const restauranteId = Number(this.route.snapshot.queryParamMap.get('restauranteId'));
    if (restauranteId) {
      this.produto.restaurante.id = restauranteId;
    } else {
      console.error('ID do restaurante não encontrado.');
    }
  }

  salvarProduto() {
    this.produto.id = Math.floor(Math.random() * 1000);

    this.productService.addProduct(this.produto);

    this.router.navigate([`/crud/produtos/${this.produto.restaurante.id}`]);
  }
}