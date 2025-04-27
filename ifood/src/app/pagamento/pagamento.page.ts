import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

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

  constructor() {}

  ngOnInit() {
    this.total = 100;
    this.balance = 500;
  }

  finalizarPagamento() {
    if (this.balance >= this.total) {
      this.balance -= this.total;
      this.paymentSuccess = true;
    } else {
      this.paymentSuccess = false;
    }
  }

  voltar() {
    window.location.href = '/tabs/tab1';
  }
}