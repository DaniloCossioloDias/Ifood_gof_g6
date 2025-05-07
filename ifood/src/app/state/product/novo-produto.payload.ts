export interface INovoProdutoPayload {
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
}