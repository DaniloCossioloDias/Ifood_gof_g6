/**
 * Tabela de RESTAURANTE.
 */
export interface IRestaurant {
    /**
     * Identificador da entidade. É um número sequencial gravado nobanco de dados.
     */
    id: number;

    /**
     * Nome do restaurante.
     */
    name: string;

    /**
     * Descrição do restaurante.
     */
    description: string;

    /**
     * Endereço do restaurante. É um texto simples, contendo os dados principais.
     * Exemplo: Londrina, Paraná, Rua belém, 133 - Centro.
     */
    address: string;

    /**
     * Data de criação do restaurante. Esse dado nunca é alterado.
     */
    createdAt: Date;
}
