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
 * Client for Kraken Produt API
 */
export class KrakenProductClient implements DEXProductClientInterface {

    /**
     * Base URL to use to interact with Kraken  API.
     */
    private krakenApiBaseURL: string

    /**
     * Logger
     */
    private readonly logger = new Logger(KrakenProductClient.name)

    /**
     * Constructor
    
     * @param krakenApiBaseURL Base URL to use to interact with Kraken REST API.
     */
    constructor(krakenApiBaseURL: string = 'https://api.kraken.com/0') {
        this.krakenApiBaseURL = krakenApiBaseURL
    }

    /**
     * Get the past 24h stats for the currency pair.
     * 
     * @param  {string} product The name of the targeted currency pair (ex : btc-usd)
     * @returns The past 24h stats for the currency pair
     * @throws DownstreamInternalError - An internal error occured in the downstream service
     * @throws DownstreamUnavailableError - The downstream service is not available
     * @throws DownstreamUnexpectedError - An unexpected error occured while interacting with the downstream service
     * @throws ClientUnexpectedError - An unexpected error occured at client level
     */
    async get24hProductStatsAsync(product: string): Promise<ProductStatsDTO> {
        
        try {
            // Request to Kraken  Product API
            var formatted_product = product.toUpperCase()
            var now = Date.now()

            this.logger.debug(`Calling Kraken API /public/OHLC?pair=${formatted_product}&interval=1440&since=${now} endpoint ...`)
            const response = await axios.get(this.krakenApiBaseURL + `/public/OHLC?pair=${formatted_product}&interval=1440&since=${now}`)

            // Logging
            this.logger.debug(`Calling Kraken API /public/OHLC?pair=${formatted_product}&interval=1440&since=${now} endpoint - Response received`)
            this.logger.debug(response.data)

            // Kraken behavior : return 200 OK with error -> throw
            if (response.data.error && response.data.error.length > 0) {
                throw {"response": {"status": 400, "msg": response.data.error}}
            }

            // Parse response
            // Example : {"error":[],"result":{"XXBTZUSD":[[1626739200,"30827.2","31065.9","29500.0","29706.3","29915.1","2117.85019820",13669]],"last":1626652800}}
            var stats = new ProductStatsDTO()
            stats.open = Big(response.data.result[formatted_product][0][1])
            stats.high = Big(response.data.result[formatted_product][0][2])
            stats.low = Big(response.data.result[formatted_product][0][3])
            stats.last = Big(response.data.result[formatted_product][0][4])
            stats.volume_24h = Big(response.data.result[formatted_product][0][6])
            stats.product = formatted_product

            // Return stats
            return stats
        } 
        catch (error) {

            // Log warning
            this.logger.debug(error, `Calling Kraken API /public/OHLC?pair=${formatted_product}&interval=1440&since=${now} endpoint - Failure`)

            // Error response from the downstream service
            if (error.response) {
                
                if (error.response.status == 500) {
                    // Kraken  API internal error returned
                    throw new DownstreamInternalError('Kraken API encountered an internal error')
                } 
                else if (error.response.status == 503) {
                    // Kraken  API unavailable
                    throw new DownstreamUnavailableError('Kraken API is unavailable')
                }
                else {
                    // An unexpected error has been returned by Kraken  API
                    throw new DownstreamUnexpectedError('Unexpected error returned by Kraken  API')
                }
            } 
            // Request sent but no response
            else if (error.request) {
                throw new DownstreamUnavailableError('Kraken API is unavailable')
            }
            // Other errors
            else {
                throw new ClientUnexpectedError('Unexpected client error')
            }
        }
    }
}