import { IRestaurant } from "./restaurant";

/**
 * Tabela de PRODUTO.
 */
export interface IProduct {
    /**
     * Identificador da entidade. É um número sequencial gravado nobanco de dados.
     */
    id: number;

    /**
     * Restaurante onde o produto foi cadastrado.
     */
    restaurante: IRestaurant;

    /**
     * Nome do produto.
     */
    name: string;

    /**
     * Descrição do produto.
     */
    description: string;

    /**
     * Valor do produto.
     */
    price: number;

    /**
     * Se o produto está disponível para compra.
     */
    available: boolean;

    /**
     * Data de criação do produto. Esse dado nunca é alterado.
     */
    createdAt: Date;
}