// Import client impl.
import { CoinbaseProductClient } from '../../../../src/clients/coinbase/coinbase_product_client'

// Import 3rd party
import Big from 'big.js'

/*****************************************************************************/
/* TESTS                                                                     */
/*****************************************************************************/

describe('TEST - Coinbase client - Regular cases', () => {

    const coinbaseProductClient = new CoinbaseProductClient()

    /**
     * CoinbaseProductClient.get24hProductStatsAsync - Normal case
     * 
     * Use the Coinbase Product API with an existing product and expect getting real stats
     * about the product. All balues are expected to be greater than 0.
     */
    test('CoinbaseProductClient.get24hProductStatsAsync', async () => {
        // Use client to get stats about an existing product
        const product = 'btc-usd'
        const stats = await coinbaseProductClient.get24hProductStatsAsync(product)

        // Check stats
        expect(stats.open.gt(Big(0.0))).toBeTruthy()
        expect(stats.high.gt(Big(0.0))).toBeTruthy()
        expect(stats.low.gt(Big(0.0))).toBeTruthy()
        expect(stats.last.gt(Big(0.0))).toBeTruthy()
        expect(stats.volume_24h.gt(Big(0.0))).toBeTruthy()
        expect(stats.product).toBe(product.toUpperCase())
    });
});
