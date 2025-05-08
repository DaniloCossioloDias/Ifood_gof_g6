package br.ifood.services;

import java.util.List;

import org.springframework.stereotype.Service;

import br.ifood.exceptions.RestaurantNotFoundException;
import br.ifood.models.Product;
import br.ifood.payloads.product.ProductDataPayload;
import br.ifood.repositories.ProductRepository;

@Service
public class ProductService {
  private final ProductRepository productRepository;

  public ProductService(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  /**
   * Lista todos os restaurantes cadastrados no sistema.
   */
  public List<Product> getAll() {
    return this.productRepository.findAll();
  }

  /**
   * Recebe um objeto de payload (contendo apenas os dados necessários) e cria
   * um novo dado de produto no banco de dados.
   * 
   * @param produtoDataPayload Objeto payload contendo os dados necessários
   *                           para a criação do produto.
   * @return Novo produto.
   */
  public Product create(ProductDataPayload produtoDataPayload) {
    return this.productRepository.save(new Product(produtoDataPayload));
  }

  /**
   * Retorna um produto a partir do ID recebido por parâmetro. Caso o ID
   * não exista, uma excessão é lançada e o servidor retorna 404.
   * 
   * @param id ID de busca.
   * @return Restaurante encontrado
   * @throws RestaurantNotFoundException Excessão que lança 404 automaticamente.
   */
  public Product get(Long id) throws RestaurantNotFoundException {
    return this.productRepository.findById(id).orElseThrow(RestaurantNotFoundException::new);
  }

  /**
   * Atualiza os dados de um produto a partir dos novos dados e do
   * ID recebido por parâmetro. Caso o ID não exista, uma excessão é lançada
   * e o servidor retorna 404.
   * 
   * @param id                 ID de busca.
   * @param produtoDataPayload Dados para sobrescrever os dados atuais.
   * @return Restaurante atualizado.
   * @throws RestaurantNotFoundException Excessão que lança 404 automaticamente.
   */
  public Product update(Long id, ProductDataPayload produtoDataPayload) throws RestaurantNotFoundException {
    Product existingRestaurant = this.get(id); // Caso não exista uma excessão 404 é lançada.
    Product updatedRestaurant = new Product(produtoDataPayload);
    updatedRestaurant.setId(existingRestaurant.getId());
    return this.productRepository.save(updatedRestaurant);
  }

  /**
   * Deleta um produto à partir de um ID. Caso não encontrado uma excessão
   * é lançada como 404.
   * 
   * @param id ID do produto a ser deletado.
   * @throws RestaurantNotFoundException Excessão que lança 404 automaticamente.
   */
  public void delete(Long id) throws RestaurantNotFoundException {
    Product existingRestaurante = this.get(id);
    this.productRepository.delete(existingRestaurante);
  }

  public List<Product> getByRestaurant(Long restaurantId) {
    return this.productRepository.findAllByRestauranteId(restaurantId);
  }
}
