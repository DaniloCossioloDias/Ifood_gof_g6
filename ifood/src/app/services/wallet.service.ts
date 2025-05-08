import { Injectable } from '@angular/core';
import { IWallet } from 'src/app/interfaces/entities/wallet';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private wallet: IWallet = { balance: 1000 }; // Saldo inicial da carteira

  /**
   * Obtém o saldo atual da carteira.
   * @returns Saldo da carteira.
   */
  getBalance(): number {
    return this.wallet.balance;
  }

  /**
   * Subtrai um valor do saldo da carteira.
   * @param amount Valor a ser subtraído.
   * @returns Verdadeiro se o pagamento foi bem-sucedido, falso se o saldo for insuficiente.
   */
  makePayment(amount: number): boolean {
    if (this.wallet.balance >= amount) {
      this.wallet.balance -= amount;
      return true;
    }
    return false; // Saldo insuficiente
  }

  /**
   * Adiciona um valor ao saldo da carteira.
   * @param amount Valor a ser adicionado.
   */
  addBalance(amount: number): void {
    this.wallet.balance += amount;
  }
}