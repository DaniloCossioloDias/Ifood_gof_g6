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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

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

    /**
     * Método put que atualiza um restaurante já existente com novos dados.
     * 
     * @param id                    ID do restaurante a ser atualizado
     * @param restaurantDataPayload novos dados do restaurante. Todos os dados
     *                              devem ser inseridos, mesmo os que não forem
     *                              ser atualizados.
     * @return Restaurante ataulizado.
     */
    @PutMapping("update/{id}")
    public ResponseEntity<Restaurant> update(@PathVariable Long id,
            @RequestBody RestaurantDataPayload restaurantDataPayload) {
        return ResponseEntity.ok(this.restaurantService.update(id, restaurantDataPayload));
    }

    /**
     * Busca um restaurante a partir do seu ID.
     * 
     * @param id ID do restaurante a ser buscado
     * @return Restaurante encontrado.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> get(@PathVariable Long id) {
        return ResponseEntity.ok(this.restaurantService.get(id));
    }

    /**
     * Deleta um restaurante à partir de um ID.
     * 
     * @param id ID do restaurante a ser delado.
     * @return Status OK.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        this.restaurantService.delete(id);
        return ResponseEntity.ok(null);
    }
}
