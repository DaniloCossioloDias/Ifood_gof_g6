package br.ifood.payloads.restaurant;

import br.ifood.models.Restaurant;

public class RestaurantFactory {

  private RestaurantFactory() {
  }

  public static Restaurant createRestaurant(RestaurantDataPayload payload) {
    Restaurant restaurant = new Restaurant();
    restaurant.setName(payload.getName());
    restaurant.setDescription(payload.getDescription());
    restaurant.setAddress(payload.getAddress());

    if (restaurant.getDescription() == null || restaurant.getDescription().isBlank()) {
      restaurant.setDescription("Restaurante de qualidade");
    }

    // normalizar nome
    restaurant.setName(restaurant.getName().trim());

    return restaurant;
  }

  public static Restaurant createDefault() {
    Restaurant restaurant = new Restaurant();
    restaurant.setName("Novo Restaurante");
    restaurant.setDescription("Descrição padrão");
    restaurant.setAddress("Endereço não informado");
    return restaurant;
  }
}
