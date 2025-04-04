package br.ifood.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "O saldo na carteira é insuficiente.")
public class InsuficientBalanceException extends RuntimeException {
    
}
