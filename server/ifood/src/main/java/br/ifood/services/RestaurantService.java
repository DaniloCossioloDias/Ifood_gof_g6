package br.ifood.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.ifood.models.Restaurant;
import br.ifood.payloads.restaurant.RestaurantDataPayload;
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

    /**
     * Recebe um objeto de payload (contendo apenas os dados necessários) e cria
     * um novo dado de restaurante no banco de dados.
     * 
     * @param restaurantDataPayload Objeto payload contendo os dados necessários
     *                              para a criação do restaurante.
     * @return Novo restaurante.
     */
    public Restaurant create(RestaurantDataPayload restaurantDataPayload) {
        return this.restaurantRepository.save(new Restaurant(restaurantDataPayload));
    }
}
