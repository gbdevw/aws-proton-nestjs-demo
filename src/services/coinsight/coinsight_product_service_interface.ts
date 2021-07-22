// Import DTOs
import { ProductStatsDTO } from '../../dto/product_stats_dto';

/**
 * Interface that provides methods related to supported products
 */
export abstract class CoinsightProductServiceInterface {
    
    /**
     * Get a list of supported decentralized exchanges (DEX).
     * 
     * @returns List of supported decentralized exchanges
     */
    abstract listDEX(): string[];

    /**
     * Get a list of supported currency pairs for the DEX.
     * 
     * @param dex Name of the decentralized exchange
     * @returns List of supported products.
     * @throws DEXNotSupportedError - If the requested exchange is not supported
     */
    abstract listSupportedProducts(dex: string): string[];

    /**
     * Get the past 24h stats for the currency pair.
     * 
     * @param dex Name of the decentralized exchange
     * @param  {string} product The name of the targeted currency pair
     * @returns The past 24h stats for the currency pair
     * @throws DEXNotSupportedError - If the requested exchange is not supported
     * @throws ProductNotSupportedError - If the requested product is not supported by the exchange
     * @throws ServiceUnavailableError - If the service is temporarely unavailable
     * @throws ServiceUnavailableError - If the service encounters an error 
     */
    abstract get24hProductStatsAsync(dex:string, product: string): Promise<ProductStatsDTO>;
}