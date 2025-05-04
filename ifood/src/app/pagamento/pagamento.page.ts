import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { OrderHistoryService } from '../services/order-history.service';
import { WalletService } from '../services/wallet.service'; 

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

  total: number = 0;
  balance: number = 0;
  paymentSuccess: boolean | null = null;
  isPaymentDisabled: boolean = false;
  hasSufficientFunds: boolean = true;

  constructor(
    private router: Router,
    private cartService: CartService,
    private orderHistoryService: OrderHistoryService,
    private walletService: WalletService 
  ) {}

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.total = this.cartService.getTotal();
    this.balance = this.walletService.getBalance();
    this.hasSufficientFunds = this.balance >= this.total;
    this.paymentSuccess = null;
    this.isPaymentDisabled = false;
  }

  finalizarPagamento() {
    if (this.isPaymentDisabled || !this.hasSufficientFunds) {
      return;
    }

    const paymentSuccessful = this.walletService.makePayment(this.total); 

    if (paymentSuccessful) {
      const itemsInCart = this.cartService.getCarrinho();
      this.orderHistoryService.addOrder(this.total, itemsInCart.length);

      this.balance = this.walletService.getBalance(); 
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