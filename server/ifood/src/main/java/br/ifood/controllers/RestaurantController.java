package br.ifood.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ifood.models.Restaurant;
import br.ifood.payloads.restaurant.RestaurantDataPayload;
import br.ifood.services.RestaurantService;

@RequestMapping(path = "/restaurant")
@RestController
public class RestaurantController {
    private final RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    /**
     * Endpoint para retornar a lista de restaurantes.
     * A lógica de acessar o banco e demais tratamentos na lista de retorno
     * deve estar contigo no método `getAll` do RestaurantService.
     */
    public ResponseEntity<List<Restaurant>> getAll() {
        return ResponseEntity.ok(this.restaurantService.getAll());
    }

    /**
     * Método post que cria um novo restaurante.
     * 
     * @param restaurantDataPayload Objeto contendo apenas os dados necessários
     *                              para a criação de um restaurante.
     * @return Retorna o restaurante criado.
     */
    @PostMapping("/new")
    public ResponseEntity<Restaurant> create(@RequestBody RestaurantDataPayload restaurantDataPayload) {
        return ResponseEntity.ok(this.restaurantService.create(restaurantDataPayload));
    }
}
