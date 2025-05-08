package br.ifood.payloads.restaurant;

import br.ifood.models.Restaurant;

public class RestaurantAdapter {
  private RestaurantAdapter() {
  }

  public static Restaurant fromPayload(RestaurantDataPayload payload) {
    Restaurant restaurant = new Restaurant();
    restaurant.setName(payload.getName());
    restaurant.setDescription(payload.getDescription());
    restaurant.setAddress(payload.getAddress());
    return restaurant;
  }

  public static RestaurantDataPayload toPayload(Restaurant restaurant) {
    return new RestaurantDataPayload(
        restaurant.getName(),
        restaurant.getDescription(),
        restaurant.getAddress());
  }
}