// Import client impl.
import { KrakenProductClient } from '../../../../src/clients/kraken/kraken_product_client'

// Import 3rd party
import Big from 'big.js'

/*****************************************************************************/
/* TESTS                                                                     */
/*****************************************************************************/

describe('TEST - Kraken client - Regular cases', () => {

    const krakenProductClient = new KrakenProductClient()

    /**
     * KrakenProductClient.get24hProductStatsAsync - Normal case
     * 
     * Use the Kraken API with an existing product and expect getting real stats
     * about the product. All balues are expected to be greater than 0.
     */
    test('KrakenProductClient.get24hProductStatsAsync', async () => {

        // Use client to get stats about an existing product
        const product = 'xxbtzusd'
        const stats = await krakenProductClient.get24hProductStatsAsync(product)

        // Check stats
        expect(stats.open.gt(Big(0.0))).toBeTruthy()
        expect(stats.high.gt(Big(0.0))).toBeTruthy()
        expect(stats.low.gt(Big(0.0))).toBeTruthy()
        expect(stats.last.gt(Big(0.0))).toBeTruthy()
        expect(stats.volume_24h.gt(Big(0.0))).toBeTruthy()
        expect(stats.product).toBe(product.toUpperCase())
    });
});
