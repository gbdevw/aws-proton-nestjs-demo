// Import NestJS testing utilities
import { Test } from '@nestjs/testing';

// Import controller
import { CoinsightController } from '../../../../src/routes/coinsight/coinsight_controller'

// Import DTO
import { ProductStatsDTO } from '../../../../src/dto/product_stats_dto'

/**
 * Regular cases test suite
 */
describe('Routes - Coinsight - Test API', () => {

    // Test globals
    const expectedDEX = ['coinbase', 'kraken']
    const expectedProducts = ['BTC-USD']
    const expectedStats = new ProductStatsDTO()

    // Build service mock
    const CoinsightProductServiceInterface = jest.fn(() => ({
        listDEX: () => expectedDEX,
        listSupportedProducts: () => expectedProducts,
        get24hProductStatsAsync: () => Promise.resolve(expectedStats)
    }));

    const mock = new CoinsightProductServiceInterface();

    /**
     * Test list dex
     */
    test('Routes - Coinsight - Test listDEX', () => {

        // Build controller
        let controller = new CoinsightController(mock)

        // Test method
        let result = controller.getSupportedDEX()

        // Check results
        expect(result.length).toBe(expectedDEX.length)
        expect(result[0]).toBe(expectedDEX[0])
        expect(result[1]).toBe(expectedDEX[1])
    });

    /**
     * Test list products
     */
    test('Routes - Coinsight - Test listSupportedProducts', () => {

        // Build controller
        let controller = new CoinsightController(mock)

        // Test method
        let result = controller.getSupportedProductsByDEX('7r011')

        // Check results
        expect(result.length).toBe(expectedProducts.length)
        expect(result[0]).toBe(expectedProducts[0])
    });

    /**
    * Test get stats
    */
    test('Routes - Coinsight - Test get stats', async () => {

        // Build controller
        let controller = new CoinsightController(mock)

        // Test method
        let result = await controller.get24hProductStats('7r011', '7r011')

        // Check results
        expect(result.open).toBe(expectedStats.open)
        expect(result.low).toBe(expectedStats.low)
        expect(result.high).toBe(expectedStats.high)
        expect(result.last).toBe(expectedStats.last)
        expect(result.volume_24h).toBe(expectedStats.volume_24h)
        expect(result.product).toBe(expectedStats.product)
    });
});