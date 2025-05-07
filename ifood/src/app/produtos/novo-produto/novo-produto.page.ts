import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators, type AbstractControl, type FormGroup } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; 
import { ProductService } from 'src/app/state/product/product.service';
import type { INovoProdutoPayload } from 'src/app/state/product/novo-produto.payload';
import { Store } from '@ngxs/store';
import { AddProduct } from 'src/app/state/product/produto.actions';
import { catchError, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.page.html',
  styleUrls: ['./novo-produto.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
})
export class NovoProdutoPage {
  public readonly restaurantId: number | undefined;

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
    const restauranteId = Number(this.route.snapshot.queryParamMap.get('restauranteId'));
    if (restauranteId) {
      this.restaurantId = restauranteId;
    } else {
      console.error('ID do restaurante não encontrado.');
    }

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

  salvarProduto() {
    if (!this.available || !this.description || !this.name || !this.price || !this.restaurantId) return;

    const payload: INovoProdutoPayload = {
      available: this.available.value,
      description: this.description.value,
      name: this.name.value,
      price: this.price.value
    }
    
    this.store.dispatch(new AddProduct(payload, this.restaurantId))
      .pipe(
        tap(() => {
          console.log('Criando produto')
        }),
        switchMap(() => {
          console.log('Produto criado:', payload);

          this.router.navigate([`/crud/produtos/${this.restaurantId}`]);

          return of(null);
        }),
        catchError((erro) => {
          console.error(erro);
          return of(erro);
        })
      ).subscribe();
  }
}