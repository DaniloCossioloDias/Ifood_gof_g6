import { IProduct } from "./product";

/**
 * Tabela de ITENS de um PRODUTO.
 */
export interface IOrderItems {
    /**
     * Identificador da entidade. É um número sequencial gravado nobanco de dados.
     */
    id: number;

    /**
     * Produto em questão.
     */
    product: IProduct;
    
    /**
     * Quantidade de itens nesse mesmo produto.
     */
    quantity: number;

    /**
     * Preço do produto nessa compra (necessário pois pode variar dependendo da promoção).
     */
    price: number;

    /**
     * Data de criação da tabela. Esse dado nunca é alterado.
     */
    createdAt: number;
}