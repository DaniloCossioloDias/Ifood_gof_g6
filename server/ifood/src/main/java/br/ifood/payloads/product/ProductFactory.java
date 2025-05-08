package br.ifood.payloads.product;

import br.ifood.models.Product;

public class ProductFactory {
  private ProductFactory() {
  }

  public static Product createProduct(ProductDataPayload payload) {
    Product product = new Product();
    product.setName(payload.getName());
    product.setDescription(payload.getDescription());
    product.setPrice(payload.getPrice());
    product.setAvailable(payload.isAvailable());

    if (payload.getPrice() == 0) {
      product.setDescription("Produto gratuito: " + payload.getDescription());
    }

    return product;
  }

  public static Product createDefault() {
    Product product = new Product();
    product.setName("Novo Produto");
    product.setDescription("Descrição padrão");
    product.setPrice(1d);
    product.setAvailable(true);
    return product;
  }
}