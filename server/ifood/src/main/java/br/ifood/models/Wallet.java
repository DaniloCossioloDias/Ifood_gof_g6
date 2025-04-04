package br.ifood.models;

import br.ifood.exceptions.InsuficientBalanceException;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Wallet {
    /**
     * Coluna que garante que essa tabela não tenha mais de uma linha.
     */
    @Id
    private int x;

    /**
     * Saldo atual na carteira.
     */
    private double balance;

    /**
     * Tenta descontar uma determinada quantia de saldo da carteira.
     * Caso não haja
     * @param ammount
     * @throws InsuficientBalanceException
     */
    public void withdraw(double ammount) throws InsuficientBalanceException {
        if (balance - ammount < 0) throw new InsuficientBalanceException();

        balance -= ammount;
        return;
    }

    /**
     * Tenta descontar uma determinada quantia de saldo da carteira.
     * Se houver crédito suficiente então retorna verdadeiro, caso contrário retorna falso.
     * @param ammount Quantia a ser descontada da carteira.
     * @return Se a carteira possui saldo o suficiente.
     */
    public boolean tryWithdraw(double ammount) {
        if (balance - ammount < 0) return false;

        balance -= ammount;
        return true;
    }

    public void deposit(double amount) {
        this.balance += amount;
    }
}
