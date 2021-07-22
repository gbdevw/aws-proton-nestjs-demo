/**
 * Interface that defines configuration properties for the Kraken Product API client implementation.
 */
export interface KrakenConfigProperties {

    /**
     * Enable Kraken suport.
     */
    enabled: boolean

    /**
     * Base URL for Kraken API.
     */
    url: string

    /**
     * List of allowed products.
     */
    products: string[]
}