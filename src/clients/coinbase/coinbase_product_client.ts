// Import interface
import { DEXProductClientInterface } from '../dex_product_client_interface'

// Import DTOs
import { ProductStatsDTO } from '../../dto/product_stats_dto'

// Import exceptions
import { DownstreamInternalError } from '../../errors/clients/downstream_internal_error'
import { DownstreamUnavailableError } from '../../errors/clients/downstream_unavailable_error'
import { DownstreamUnexpectedError } from '../../errors/clients/downstream_unexpected_error'
import { ClientUnexpectedError } from '../../errors/clients/client_unexpected_error'

// NestJS
import { Logger } from '@nestjs/common'


// 3rd party

const axios = require('axios')
import Big from 'big.js';

/**
 * Client for Coinbase Pro Product API
 */
export class CoinbaseProductClient implements DEXProductClientInterface {

    /**
     * Base URL to use to interact with Coinbase Pro API.
     */
    private coinbaseProApiBaseURL: string

    /**
     * Logger
     */
    private readonly logger = new Logger(CoinbaseProductClient.name)

    /**
     * Constructor
     * 
     * @param coinbaseProApiBaseURL Base URL to use to interact with Coinbase Pro Product API. Default to Coinbase sandbox env.
     */
    constructor(coinbaseProApiBaseURL: string = 'https://api-public.sandbox.pro.coinbase.com') {
        this.coinbaseProApiBaseURL = coinbaseProApiBaseURL
    }

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
    async get24hProductStatsAsync(product: string): Promise<ProductStatsDTO> {
        try {
            // Format product
            var formatted_product = product.toLowerCase()

            // Request to Coinbase Pro Product API
            this.logger.debug(`Calling Coinbase Pro API /products/${formatted_product}/stats endpoint ...`)
            const response = await axios.get(this.coinbaseProApiBaseURL + `/products/${formatted_product}/stats`)

            // Parse response
            this.logger.debug(`Calling Coinbase Pro API /products/${formatted_product}/stats endpoint - Response received`)
            this.logger.debug(response.data)
            var stats = new ProductStatsDTO()
            stats.open = Big(response.data.open)
            stats.high = Big(response.data.high)
            stats.low = Big(response.data.low)
            stats.last = Big(response.data.last)
            stats.volume_24h = Big(response.data.volume)
            stats.product = formatted_product.toUpperCase()

            // Return stats
            return stats
        } 
        catch (error) {

            // Log warning
            this.logger.debug(error, `Calling Coinbase Pro API /products/${formatted_product}/stats endpoint - Failure`)

            // Error response from the downstream service
            if (error.response) {
                
                if (error.response.status == 500) {
                    // COinbase Pro API internal error returned
                    throw new DownstreamInternalError('Coinbase Pro API encountered an internal error')
                } 
                else if (error.response.status == 503) {
                    // Coinbase Pro API unavailable
                    throw new DownstreamUnavailableError('Coinbase Pro API is unavailable')
                }
                else {
                    // An unexpected error has been returned by Coinbase Pro API
                    throw new DownstreamUnexpectedError('Unexpected error returned by Coinbase Pro API')
                }
            } 
            // Request sent but no response
            else if (error.request) {
                throw new DownstreamUnavailableError('Coinbase Pro API is unavailable')
            }
            // Other errors
            else {
                throw new ClientUnexpectedError('Unexpected client error')
            }
        }
    }
}