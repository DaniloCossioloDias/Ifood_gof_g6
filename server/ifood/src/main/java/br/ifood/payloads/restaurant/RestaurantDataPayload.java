package br.ifood.payloads.restaurant;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantDataPayload {
  @NotBlank(message = "O campo nome é obrigatório.")
  private String name;

  @NotBlank(message = "O campo descrição é obrigatório.")
  private String description;

  @NotBlank(message = "O campo endereço é obrigatório.")
  private String address;
}
