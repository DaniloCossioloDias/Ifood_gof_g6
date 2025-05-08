package br.ifood.payloads.product;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDataPayload {
  /**
   * Nome do produto.
   */
  @NotBlank(message = "O campo nome é obrigatório.")
  private String name;

  /**
   * Descrição do produto.
   */
  @NotBlank(message = "O campo descrição é obrigatório.")
  private String description;

  /**
   * Valor do produto.
   */
  @Min(value = 1, message = "O valor do produto deve ser ao menos 1 real")
  @NotNull(message = "O campo quantia não pode ser vazio.")
  private Double price;

  /**
   * Se o produto está disponível para compra.
   */
  @NotNull(message = "O campo disponibilidade não pode ser vazio.")
  private boolean available;
}
