package br.ifood.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Restaurante não encontrado.")
public class RestaurantNotFoundException extends RuntimeException {
}