import type { HttpErrorResponse } from "@angular/common/http";

export interface IBaseState {
  /**
   * Estado de carregamento de uma solicitação.
   *
   * @type {boolean}
   */
  carregando: boolean;

  /**
   * Erro na solicitação, caso exista.
   *
   * @type {?HttpErrorResponse}
   */
  erro?: HttpErrorResponse;
}