// Em src/app/tabs/tab3/tab3.page.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { OrderHistoryService, OrderHistoryItem } from '../../app/services/order-history.service';
import { WalletService } from '../../app/services/wallet.service'; 

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class Tab3Page implements OnInit {

  orderHistory: OrderHistoryItem[] = [];
  currentBalance: number = 0;

  constructor(
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
    this.orderHistory = this.orderHistoryService.getHistory();
    this.currentBalance = this.walletService.getBalance(); 
  }

  handleRefresh(event: any) {
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  adicionarSaldo() {
    this.walletService.addBalance(1000); 
    this.currentBalance = this.walletService.getBalance();
  }
}