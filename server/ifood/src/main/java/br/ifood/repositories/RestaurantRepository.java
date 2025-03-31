package br.ifood.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ifood.models.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

}
