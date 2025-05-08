package br.ifood.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ifood.models.Product;
import br.ifood.payloads.product.ProductDataPayload;
import br.ifood.services.ProductService;
import jakarta.validation.Valid;

@RequestMapping(path = "product")
@RestController
public class ProductController {
  private final ProductService productService;

  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  /**
   * Endpoint para retornar a lista de restaurantes.
   * A lógica de acessar o banco e demais tratamentos na lista de retorno
   * deve estar contigo no método `getAll` do ProductService.
   */
  @GetMapping
  public ResponseEntity<List<Product>> getAll() {
    return ResponseEntity.ok(this.productService.getAll());
  }

  /**
   * Método post que cria um novo produto.
   * 
   * @param productDataPayload Objeto contendo apenas os dados necessários
   *                           para a criação de um produto.
   * @return Retorna o produto criado.
   */
  @PostMapping("")
  public ResponseEntity<Product> create(@RequestBody @Valid ProductDataPayload productDataPayload) {
    return ResponseEntity.ok(this.productService.create(productDataPayload));
  }

  /**
   * Método put que atualiza um produto já existente com novos dados.
   * 
   * @param id                 ID do produto a ser atualizado
   * @param productDataPayload novos dados do produto. Todos os dados
   *                           devem ser inseridos, mesmo os que não forem
   *                           ser atualizados.
   * @return Restaurante ataulizado.
   */
  @PutMapping("update/{id}")
  public ResponseEntity<Product> update(@PathVariable Long id,
      @RequestBody @Valid ProductDataPayload productDataPayload) {
    return ResponseEntity.ok(this.productService.update(id, productDataPayload));
  }

  /**
   * Busca um produto a partir do seu ID.
   * 
   * @param id ID do produto a ser buscado
   * @return Restaurante encontrado.
   */
  @GetMapping("/{id}")
  public ResponseEntity<Product> get(@PathVariable Long id) {
    return ResponseEntity.ok(this.productService.get(id));
  }

  /**
   * Deleta um produto à partir de um ID.
   * 
   * @param id ID do produto a ser delado.
   * @return Status OK.
   */
  @DeleteMapping("/{id}")
  public ResponseEntity<Void> delete(@PathVariable Long id) {
    this.productService.delete(id);
    return ResponseEntity.ok(null);
  }

  @GetMapping("/restaurant/{restaurantId}")
  public ResponseEntity<List<Product>> findAllByRestaurant(@PathVariable Long restaurantId) {
    return ResponseEntity.ok(this.productService.getByRestaurant(restaurantId));
  }
}
