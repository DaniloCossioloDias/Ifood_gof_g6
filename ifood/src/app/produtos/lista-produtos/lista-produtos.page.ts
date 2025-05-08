import { Component, Inject, OnInit } from '@angular/core';
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
  IonButtons, 
  IonFab, 
  IonFabButton,
  IonBackButton 
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service'; // Importação do CartService
import { IProduct } from 'src/app/interfaces/entities/product';
import { IRestaurant } from 'src/app/interfaces/entities/restaurant';
import { Store } from '@ngxs/store';
import { GetRestauranteById } from 'src/app/state/restaurant/restaurante.actions';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';
import { RestauranteState } from 'src/app/state/restaurant/restaurante.state';
import { DeleteProduct, GetProductsByRestaurant } from 'src/app/state/product/produto.actions';
import { ProdutoState } from 'src/app/state/product/produto.state';

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
    @Inject(ActivatedRoute) private readonly route: ActivatedRoute,
    @Inject(Router) private readonly router: Router,
    @Inject(Store) private readonly store: Store,
    @Inject(CartService) private readonly cartService: CartService
  ) {
    this.restauranteId = this.getRestauranteId();
  }

  ngOnInit() {
    this.fetchData();
  }

  ionViewWillEnter() {
    this.fetchData();
  }

  fetchData() {
    if (!this.restauranteId) {
      console.error('ID do restaurante não encontrado!');
      return;
    }
    this.fetchRestaurante(this.restauranteId);
    this.fetchProdutosByRestaurante(this.restauranteId);
  }

  getRestauranteId() {
    const restauranteId = Number(this.route.snapshot.paramMap.get('id'));

    return restauranteId;
  }

  fetchRestaurante(restauranteId: number) {
    this.store.dispatch(new GetRestauranteById(restauranteId))
      .pipe(
        tap(() => {
          console.log('Carregando restaurante: ', restauranteId);
        }),
        switchMap(() => {
          this.restaurante = this.store.selectSnapshot(RestauranteState.getLastRestaurante);
          console.log('Restaurante carregado:', this.restaurante);
          return of(this.restaurante);
        }),
        catchError((erro) => {
          console.error(erro);
          return of(erro);
        })
      ).subscribe();
  }

  fetchProdutosByRestaurante(restauranteId: number) {
    this.store.dispatch(new GetProductsByRestaurant(restauranteId))
      .pipe(
        tap(() => {
          console.log('Carregando produtos do restaurante: ', restauranteId);
        }),
        switchMap(() => {
          this.produtos = this.store.selectSnapshot(ProdutoState.getListaProdutos);
          console.log('Produtos carregados:', this.produtos);
          return of(this.produtos);
        }),
        catchError((erro) => {
          console.error(erro);
          return of(erro);
        })
      ).subscribe();
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
    this.store.dispatch(new DeleteProduct(id))
      .pipe(
        tap(() => {
          console.log('Deletando produto: ', id);
        }),
        switchMap(() => {
          console.log('Produto excluido: ', id);
          return of(null);
        }),
        catchError((erro) => {
          console.error(erro);
          return of(erro);
        }),
        finalize(() => {
          if (!this.restauranteId) return;

          this.fetchProdutosByRestaurante(this.restauranteId);
        })
      ).subscribe();
  }
}