import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common'; 
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, type AbstractControl, type FormGroup } from '@angular/forms'; 
import { ProductService } from 'src/app/state/product/product.service';
import { IProduct } from 'src/app/interfaces/entities/product';
import { Store } from '@ngxs/store';
import { GetProductById, UpdateProduct } from 'src/app/state/product/produto.actions';
import { of, tap, switchMap, catchError } from 'rxjs';
import { ProdutoState } from 'src/app/state/product/produto.state';
import type { INovoProdutoPayload } from 'src/app/state/product/novo-produto.payload';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.page.html',
  styleUrls: ['./editar-produto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class EditarProdutoPage implements OnInit {
  private readonly productId;

  produto: IProduct | undefined;

  public readonly productFormGroup: FormGroup;

  get name(): AbstractControl | null {
    return this.productFormGroup.get('name');
  }
  
  get description(): AbstractControl | null {
    return this.productFormGroup.controls['description'];
  }
  
  get price(): AbstractControl | null {
    return this.productFormGroup.get('price');
  }

  get available(): AbstractControl | null {
    return this.productFormGroup.get('available');
  }

  constructor(
    @Inject(ActivatedRoute) private readonly route: ActivatedRoute,
    @Inject(ProductService) private readonly productService: ProductService,
    @Inject(Router) private readonly router: Router,
    @Inject(FormBuilder) private readonly formBuilder: FormBuilder,
    @Inject(Store) private readonly store: Store
  ) {
    this.productId = this.getProductId();
    this.productFormGroup = this.inicializarFormGroup();
  }

  inicializarFormGroup(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      available: [true, Validators.required]
    })
  }

  getProductId(): number | undefined {
    const idParam = Number(this.route.snapshot.paramMap.get('id'));
    if (idParam) {
      return idParam;
    } else {
      console.error('ID do produto não encontrado na rota!');
      return undefined;
    }
  }

  ngOnInit() {
    if (!this.productId) return;
    this.fetchProduto(this.productId);
  }

  fetchProduto(productId: number) {
    this.store.dispatch(new GetProductById(productId))
      .pipe(
        tap(() => {
          console.log('Carregando produto: ', productId);
        }),
        switchMap(() => {
          this.produto = this.store.selectSnapshot(ProdutoState.getLastProduto);
          console.log('Produto carregados:', this.produto);
          return of(this.produto);
        }),
        catchError((erro) => {
          console.error(erro);
          return of(erro);
        })
      ).subscribe();
  }

  atualizarProduto() {
    if (!this.available || !this.description || !this.name || !this.price || !this.productId || this.produto) return;

    const payload: INovoProdutoPayload = {
      available: this.available.value,
      description: this.description.value,
      name: this.name.value,
      price: this.price.value,
    }
    
    this.store.dispatch(new UpdateProduct(payload, this.productId))
      .pipe(
        tap(() => {
          console.log('Criando produto')
        }),
        switchMap(() => {
          console.log('Produto criado:', payload);

          this.router.navigate([`/crud/produtos/${this.produto?.restaurante.id}`]);

          return of(null);
        }),
        catchError((erro) => {
          console.error(erro);
          return of(erro);
        })
      ).subscribe();
  }
}