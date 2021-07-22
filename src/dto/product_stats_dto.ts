// 3rd party
import Big from 'big.js';

/**
 * This class contains the past 24h stats for a currency pair.
 */
export class ProductStatsDTO {

    /**
     * Currency pair
     */
    product: string = 'BTC-USD'

    /**
     * Starting price for the period
     */
    open: Big = new Big(0.0)

    /**
     * Highest price for the period
     */
    high: Big = new Big(0.0)

    /**
     * Lowest price for the period
     */
    low: Big = new Big(0.0)

    /**
     * Price of the latest match
     */
    last: Big = new Big(0.0)

    /**
     * Volume of unit currency exchanged the past 24 hours
     */
    volume_24h: Big = new Big(0.0)
}