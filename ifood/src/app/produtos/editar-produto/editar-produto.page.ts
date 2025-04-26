import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/interfaces/entities/product';

@Component({
  selector: 'app-editar-produto',
  templateUrl: './editar-produto.page.html',
  styleUrls: ['./editar-produto.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class EditarProdutoPage implements OnInit {
  produto: IProduct | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.produto = this.productService.getProductById(id);
    }
  }

  salvarProduto() {
    if (this.produto) {
      this.productService.updateProduct(this.produto.id, this.produto);
  
      const restauranteId = this.produto.restaurante.id;
      this.router.navigate([`/crud/produtos/${restauranteId}`]); 
    }
  }
}