package br.ifood.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.ifood.exceptions.RestaurantNotFoundException;
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

    /**
     * Retorna um restaurante a partir do ID recebido por parâmetro. Caso o ID
     * não exista, uma excessão é lançada e o servidor retorna 404.
     * 
     * @param id ID de busca.
     * @return Restaurante encontrado
     * @throws RestaurantNotFoundException Excessão que lança 404 automaticamente.
     */
    public Restaurant get(Long id) throws RestaurantNotFoundException {
        return this.restaurantRepository.findById(id).orElseThrow(RestaurantNotFoundException::new);
    }

    /**
     * Atualiza os dados de um restaurante a partir dos novos dados e do
     * ID recebido por parâmetro. Caso o ID não exista, uma excessão é lançada
     * e o servidor retorna 404.
     * 
     * @param id                    ID de busca.
     * @param restaurantDataPayload Dados para sobrescrever os dados atuais.
     * @return Restaurante atualizado.
     * @throws RestaurantNotFoundException Excessão que lança 404 automaticamente.
     */
    public Restaurant update(Long id, RestaurantDataPayload restaurantDataPayload) throws RestaurantNotFoundException {
        Restaurant existingRestaurant = this.get(id); // Caso não exista uma excessão 404 é lançada.
        Restaurant updatedRestaurant = new Restaurant(restaurantDataPayload);
        updatedRestaurant.setId(existingRestaurant.getId());
        return this.restaurantRepository.save(updatedRestaurant);
    }
}
