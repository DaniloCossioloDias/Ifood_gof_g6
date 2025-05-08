package br.ifood.payloads.product;

import br.ifood.models.Product;

public class ProductAdapter {
  private ProductAdapter() {
  }

  public static Product fromPayload(ProductDataPayload payload) {
    Product product = new Product();
    product.setName(payload.getName());
    product.setDescription(payload.getDescription());
    product.setPrice(payload.getPrice());
    product.setAvailable(payload.isAvailable());
    return product;
  }

  public static ProductDataPayload toPayload(Product product) {
    return new ProductDataPayload(
        product.getName(),
        product.getDescription(),
        product.getPrice(),
        product.isAvailable());
  }
}