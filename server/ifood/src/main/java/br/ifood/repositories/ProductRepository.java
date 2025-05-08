package br.ifood.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ifood.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
  public List<Product> findAllByRestauranteId(Long restauranteId);
}
