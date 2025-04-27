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
  IonButton, 
  IonIcon, 
  IonButtons, 
  IonFab, 
  IonFabButton,
  IonBackButton 
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { RestauranteService } from 'src/app/services/restaurante.service';
import { CartService } from 'src/app/services/cart.service'; // Importação do CartService
import { IProduct } from 'src/app/interfaces/entities/product';
import { IRestaurant } from 'src/app/interfaces/entities/restaurant';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.page.html',
  styleUrls: ['./lista-produtos.page.scss'],
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
    IonButton,
    IonIcon,
    IonButtons,
    IonFab,
    IonFabButton,
    IonBackButton,
  ],
})
export class ListaProdutosPage implements OnInit {
  produtos: IProduct[] = [];
  restauranteId: number | undefined;
  restaurante: IRestaurant | undefined;
  mostrarLista: boolean = false; 
  carrinho: IProduct[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private restauranteService: RestauranteService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.atualizarListaProdutos();
  }

  ionViewWillEnter() {
    this.atualizarListaProdutos();
  }

  atualizarListaProdutos() {
    this.restauranteId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.restauranteId) {
      this.produtos = this.productService.getProductsByRestaurant(this.restauranteId);

      this.restaurante = this.restauranteService.getRestauranteById(this.restauranteId);

      if (!this.restaurante) {
        console.error(`Restaurante com ID ${this.restauranteId} não encontrado.`);
      }
    } else {
      console.error('ID do restaurante não encontrado na rota.');
    }
  }

  adicionarAoCarrinho(produto: IProduct) {
    this.cartService.adicionarAoCarrinho(produto);
    console.log('Produto adicionado ao carrinho:', produto);
  }

  novoProduto() {
    if (this.restauranteId) {
      this.router.navigate(['/crud/produto/new'], {
        queryParams: { restauranteId: this.restauranteId },
      });
    } else {
      console.error('ID do restaurante não encontrado.');
    }
  }

  editarProduto(id: number) {
    this.router.navigate([`/crud/produto/${id}`]);
  }

  excluirProduto(id: number) {
    this.productService.deleteProduct(id);
    this.atualizarListaProdutos();
  }
}