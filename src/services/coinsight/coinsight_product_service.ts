// Import service interface
import { CoinsightProductServiceInterface } from './coinsight_product_service_interface';

// Import DTOs
import { ProductStatsDTO } from '../../dto/product_stats_dto'

// Import config. providers
import { ConsightConfigProvider } from '../../configuration/providers/coinsight/coinsight_config_provider'

// Import clients
import { DEXProductClientInterface } from '../../clients/dex_product_client_interface'
import { CoinbaseProductClient } from '../../clients/coinbase/coinbase_product_client'
import { KrakenProductClient } from '../../clients/kraken/kraken_product_client'

// Import exceptions
import { ClientUnexpectedError } from '../../errors/clients/client_unexpected_error'
import { DownstreamInternalError } from '../../errors/clients/downstream_internal_error'
import { DownstreamUnavailableError } from '../../errors/clients/downstream_unavailable_error'
import { DownstreamUnexpectedError } from '../../errors/clients/downstream_unexpected_error'
import { ServiceInternalError } from '../../errors/services/service_internal_error'
import { ServiceUnavailableError} from '../../errors/services/service_unavailable_error'
import { DEXNotSupportedError } from '../../errors/services/coinsight/dex_not_supported_error'
import { ProductNotSupportedError } from '../../errors/services/coinsight/product_not_supported_error'

// Import Nest JS libs
import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common'

@Injectable()
export class CoinsightProductService implements CoinsightProductServiceInterface {

  /**
   * Map each exchange name with its API client.
   */
  private coinsightDEXClientsMap: Map<string, DEXProductClientInterface>

  /**
   * Map each exchange name the list of supported products
   */
  private coinsightDEXProductsMap: Map<string, string[]>

  /**
   * Logger
   */
  private readonly logger = new Logger(CoinsightProductService.name)

  /**
   * Constructor.
   * @param config Service configuration properties 
   */
  constructor(config: ConsightConfigProvider) {

    // Build empty maps
    this.coinsightDEXClientsMap = new Map<string, DEXProductClientInterface>()
    this.coinsightDEXProductsMap = new Map<string, string[]>()

    // Configure Coinbase client if needed
    if (config.coinsightConfigProperties.coinbase.enabled) {
      let coinbaseName = 'coinbase'
      this.coinsightDEXProductsMap.set(coinbaseName, config.coinsightConfigProperties.coinbase.products)
      this.coinsightDEXClientsMap.set(coinbaseName, new CoinbaseProductClient(config.coinsightConfigProperties.coinbase.url))
    }

    // Configure Kraken client if needed
    if (config.coinsightConfigProperties.kraken.enabled) {
      let krakenName = 'kraken'
      this.coinsightDEXProductsMap.set(krakenName, config.coinsightConfigProperties.kraken.products)
      this.coinsightDEXClientsMap.set(krakenName, new KrakenProductClient(config.coinsightConfigProperties.kraken.url))
    }
  }

  /**
   * Get a list of supported decentralized exchanges (DEX).
   * 
   * @returns List of supported decentralized exchanges
   */
   listDEX(): string[] {
    // Return list of keys
    this.logger.debug(`Fetching supported exchanges`)
    return Array.from(this.coinsightDEXClientsMap.keys())
  }

  /**
   * Get a list of supported currency pairs for the DEX.
   * 
   * @param dex Name of the decentralized exchange
   * @returns List of supported products.
   * @throws DEXNotSupportedError - If the requested exchange is not supported
   */
   listSupportedProducts(dex: string): string[] {
    // Check if DEX is suported
    if (this.listDEX().includes(dex)) {
      // Return the products supported by the exchange
      this.logger.debug(`Fetching products supported by ${dex}`)
      return this.coinsightDEXProductsMap.get(dex)
    }
    else {
      // Throw error -> not supported dex
      throw new DEXNotSupportedError(`${dex} is not a supported exchange`)
    }
  }

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
  async get24hProductStatsAsync(dex: string, product: string): Promise<ProductStatsDTO> {

    // Check if dex & product product are supported
    if (!this.listSupportedProducts(dex).includes(product)) {
      // Throw error -> not supported dex
      throw new ProductNotSupportedError(`${product} is not a supported on ${dex}`)
    }

    try {
      // Get stats
      this.logger.debug(`Fetching stats for ${product} on ${dex}`)
      return await this.coinsightDEXClientsMap.get(dex).get24hProductStatsAsync(product)
    }
    catch(error) {
      // Check if error is at the downstream level -> unavailable or internal error
      if(error instanceof DownstreamInternalError || error instanceof DownstreamUnavailableError) {
        // Log warning
        this.logger.debug('Error with downstream service', error)
        throw new ServiceUnavailableError ('Coinsight product service is currently not available.')
      }

      // Check if error is at client level
      if(error instanceof DownstreamUnexpectedError || error instanceof ClientUnexpectedError) {
        // Log warning
        this.logger.debug('Error with API client', error)
        throw new ServiceInternalError ('Coinsight product service encountered an error.')
      }
      else {
        // Reraise
        throw error
      }
    }
  }
}
