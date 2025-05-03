import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class PagamentoPage implements OnInit {

  static currentBalance: number = 500;

  total: number = 0;
  balance: number = 0;
  paymentSuccess: boolean | null = null;
  isPaymentDisabled: boolean = false;
  hasSufficientFunds: boolean = true;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.total = this.cartService.getTotal();
    this.balance = PagamentoPage.currentBalance;
    this.hasSufficientFunds = this.balance >= this.total;
    this.paymentSuccess = null;
    this.isPaymentDisabled = false;
  }

  ionViewWillEnter() {
    this.ngOnInit();
  }

  finalizarPagamento() {
    if (this.isPaymentDisabled || !this.hasSufficientFunds) {
      return;
    }

    if (this.balance >= this.total) {
      PagamentoPage.currentBalance -= this.total;
      this.balance = PagamentoPage.currentBalance;
      this.paymentSuccess = true;
      this.isPaymentDisabled = true;
      this.cartService.limparCarrinho();
    } else {
      this.paymentSuccess = false;
      this.hasSufficientFunds = false;
    }
  }

  voltar(origem: 'sucesso' | 'erro' | 'insuficiente') {
    const targetRoute = (origem === 'sucesso') ? '/tabs/tab1' : '/tabs/tab2';
    this.router.navigateByUrl(targetRoute);
  }
}