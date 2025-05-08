package br.ifood.models;

import java.util.List;

import br.ifood.payloads.restaurant.RestaurantDataPayload;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Restaurant extends BaseEntity {
  private String name;

  private String description;

  private String address;

  @OneToMany(mappedBy = "restaurante")
  private List<Product> product;

  public Restaurant(RestaurantDataPayload payload) {
    this.name = payload.getName();
    this.address = payload.getAddress();
    this.description = payload.getDescription();
  }
}
