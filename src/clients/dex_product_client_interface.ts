// Import DTOs
import { ProductStatsDTO } from '../dto/product_stats_dto'

/**
 * Interface that provides methods to interact with the API of a DEX to get
 * stats about products.
 */
export interface DEXProductClientInterface {
    
    /**
     * Get the past 24h stats for the currency pair.
     * 
     * @param  {string} product The name of the targeted currency pair
     * @returns The past 24h stats for the currency pair
     * @throws DownstreamInternalError - An internal error occured in the downstream service
     * @throws DownstreamUnavailableError - The downstream service is not available
     * @throws DownstreamUnexpectedError - An unexpected error occured while interacting with the downstream service
     * @throws ClientUnexpectedError - An unexpected error occured at client level
     */
    get24hProductStatsAsync(product: string): Promise<ProductStatsDTO>
}