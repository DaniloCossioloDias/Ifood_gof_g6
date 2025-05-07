package br.ifood.payloads.wallet;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DepositPayload {
    @Min(value = 1, message = "Deposite ao menos R$1 real.")
    @NotNull(message = "O campo quantia não pode ser vazio.")
    private double amount;
}
