/**
 * Interface that defines configuration properties for the Coinbase Product API client implementation.
 */
export interface CoinbaseConfigProperties {

    /**
     * Enable Coinbase suport.
     */
    enabled: boolean

    /**
     * Base URL for Coinbase Pro API.
     */
    url: string

    /**
     * List of allowed products.
     */
    products: string[]
}