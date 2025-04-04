package br.ifood.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.ifood.models.Wallet;

public interface WalletRepository extends JpaRepository<Wallet, Integer> {
    @Query("select w FROM Wallet w WHERE w.x = 1")
    Wallet getApplicationWallet();
}
