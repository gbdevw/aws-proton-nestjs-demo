// Import sub-properties
import { CoinbaseConfigProperties } from './coinbase/coinbase_config_properties'
import { KrakenConfigProperties } from './kraken/kraken_config_properties'

/**
 * Interface that defines configuration properties for Coinsight service.
 */
export interface CoinsightConfigProperties {

    /**
     * Configuration of the Coinbase Product API client.
     */
    coinbase: CoinbaseConfigProperties

    /**
     * COnfiguration of the Kraken Product API client
     */
    kraken: KrakenConfigProperties
}