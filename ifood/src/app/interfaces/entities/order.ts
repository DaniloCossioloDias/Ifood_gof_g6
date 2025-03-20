import { IOrderItems } from "./order_items";
import { IRestaurant } from "./restaurant";

/**
 * Tabela de PEDIDO.
 */
export interface IOrder {
    /**
     * Identificador da entidade. É um número sequencial gravado nobanco de dados.
     */
    id: number;

    /**
     * Restaurante onde o pedido foi realizado
     */
    restaurant: IRestaurant;

    /**
     * Preço total do pedido.
     */
    totalPrice: number;

    /**
     * Status do pedido.
     */
    status: EOrderStatus;

    /**
     * Itens presentes nesse pedido.
     */
    orderItems: IOrderItems[];

    /**
     * Data de criação do pedido. Esse dado nunca é alterado.
     */
    createdAt: Date;
}

export enum EOrderStatus {
    CONFIRMADO = "CONFIRMADO",
    EM_PREPARACAO = "EM_PREPARACAO",
    ENCAMINHADO = "ENCAMINHADO",
    CONCLUIDO = "CONCLUIDO",
    CANCELADO = "CANCELADO"
}