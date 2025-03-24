import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { IOrder, EOrderStatus } from '../interfaces/entities/order';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.page.html',
  styleUrls: ['./historico.page.scss'],
})
export class HistoricoPage implements OnInit {
  orders: IOrder[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe((data: IOrder[]) => {
      this.orders = data.filter(order => order.status === EOrderStatus.CONCLUIDO);
    });
  }
}
