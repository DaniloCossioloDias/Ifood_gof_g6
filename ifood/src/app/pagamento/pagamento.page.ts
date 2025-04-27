import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // Importação do módulo IonicModule
import { Router } from '@angular/router'; // Importação do Router

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
  standalone: true,
  imports: [
    CommonModule, // Necessário para pipes como 'number'
    FormsModule,  // Necessário para formulários (se necessário)
    IonicModule   // Importação do módulo IonicModule para os componentes do Ionic
  ]
})
export class PagamentoPage implements OnInit {
  total: number = 0;
  balance: number = 0;
  paymentSuccess: boolean | null = null;
  isPaymentDisabled: boolean = false;

  constructor(private router: Router) {} // Injeta o Router

  ngOnInit() {
    this.total = 100; // Exemplo de valor total
    this.balance = 500; // Exemplo de saldo
  }

  finalizarPagamento() {
    if (this.isPaymentDisabled) {
      return;
    }

    if (this.balance >= this.total) {
      this.balance -= this.total;
      this.paymentSuccess = true;
      this.isPaymentDisabled = true;
    } else {
      this.paymentSuccess = false;
    }
  }

  voltar() {
    window.location.href = '/tabs/tab1';
  }
}