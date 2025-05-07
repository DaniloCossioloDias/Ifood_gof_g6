import { Injectable } from '@angular/core';

export interface OrderHistoryItem {
  id: number;
  date: Date;
  total: number;
  itemCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private readonly orderHistory: OrderHistoryItem[] = [];

  constructor() { }

  addOrder(total: number, itemsCount: number) {
    const newOrder: OrderHistoryItem = {
      id: Date.now(),
      date: new Date(),
      total: total,
      itemCount: itemsCount
    };
    this.orderHistory.unshift(newOrder);
  }

  getHistory(): OrderHistoryItem[] {
    return [...this.orderHistory];
  }
}