package br.ifood.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.ifood.models.Restaurant;
import br.ifood.repositories.RestaurantRepository;

@Service
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;

    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    /**
     * Lista todos os restaurantes cadastrados no sistema.
     */
    public List<Restaurant> getAll() {
        return this.restaurantRepository.findAll();
    }
}
