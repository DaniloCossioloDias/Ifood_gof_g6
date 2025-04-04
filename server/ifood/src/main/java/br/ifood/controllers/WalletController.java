package br.ifood.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ifood.payloads.wallet.DepositPayload;
import br.ifood.services.WalletService;
import jakarta.validation.Valid;

@RequestMapping("wallet")
@RestController
public class WalletController {
    private final WalletService walletService;

    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    /**
     * Retorna o saldo atual da carteira da aplicação. Dado o escopo do projeto
     * existe apenas uma carteira na aplicação.
     *
     * @return Saldo atual.
     */
    @GetMapping("/balance")
    public ResponseEntity<Double> getBalance() {
        return ResponseEntity.ok(this.walletService.getBalance());
    }

    /**
     * Deposita uma determinada quantia na carteira.
     *
     * @param depositPayload Objeto contendo as informações do depósito.
     * @return Novo saldo da carteira.
     */
    @PostMapping("/deposit")
    public ResponseEntity<Double> deposit(@RequestBody @Valid DepositPayload depositPayload) {
        return ResponseEntity.ok(this.walletService.deposit(depositPayload));
    }
}
