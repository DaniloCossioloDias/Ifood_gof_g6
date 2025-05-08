package br.ifood.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import br.ifood.payloads.product.ProductDataPayload;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product extends BaseEntity {
  /**
   * Restaurante onde o produto foi cadastrado.
   */
  @ManyToOne
  @JoinColumn(name = "restaurant_id")
  @JsonIgnore
  private Restaurant restaurante;

  /**
   * Nome do produto.
   */
  private String name;

  /**
   * Descrição do produto.
   */
  private String description;

  /**
   * Valor do produto.
   */
  private Double price;

  /**
   * Se o produto está disponível para compra.
   */
  private boolean available;

  public Product(ProductDataPayload payload) {
    this.name = payload.getName();
    this.description = payload.getDescription();
    this.price = payload.getPrice();
    this.available = payload.isAvailable();
  }
}
