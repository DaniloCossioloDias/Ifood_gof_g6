package br.ifood.services;

import org.springframework.stereotype.Service;

import br.ifood.models.Wallet;
import br.ifood.payloads.wallet.DepositPayload;
import br.ifood.repositories.WalletRepository;

@Service
public class WalletService {
    private final WalletRepository walletRepository;

    public WalletService(WalletRepository walletRepository) {
        this.walletRepository = walletRepository;
    }

    /**
     * Retorna a carteira da aplicação. Dado o escopo do projeto existe
     * apenas uma carteira para toda a aplicação.
     *
     * @return Retorna a carteira da aplicação.
     */
    public Wallet getApplicationWallet() {
        return this.walletRepository.getApplicationWallet();
    }

    /**
     * Retorna o saldo atual do sistema.
     *
     * @return Saldo atual.
     */
    public double getBalance() {
        return this.getApplicationWallet().getBalance();
    }

    /**
     * Deposita um valor na carteira e retorna o novo saldo.
     * @param depositPayload Objeto contendo os dados do deposito.
     * @return Novo saldo da carteira.
     */
    public double deposit(DepositPayload depositPayload) {
        Wallet wallet = this.getApplicationWallet();
        wallet.deposit(depositPayload.getAmount());
        this.walletRepository.save(wallet);
        return wallet.getBalance();
    }
}
