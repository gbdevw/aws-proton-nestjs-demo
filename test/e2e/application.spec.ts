// Import NestJS libs
import { Test } from '@nestjs/testing';
import { Body, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

// Import application module
import { ApplicationModule } from '../../src/application_module'

// Import DTO
import { ProductStatsDTO } from '../../src/dto/product_stats_dto'

// Import provider to override
import { coinsightServiceProvider } from '../../src/services/coinsight/coinsight_service_module'

// Import 3rd party
import Big from 'big.js';

describe('Application testing with overriden service module', () => {

    // NestJS Application
    let app: INestApplication

    // Test globals
    const expectedDEX = ['coinbase', 'kraken']
    const expectedProducts = ['btc-usd', 'eth-eur']
    const expectedStatsProduct = 'BTC-USD'

    beforeAll(async () => {

        // Build app testng module
        const moduleRef = await Test.createTestingModule({
            imports: [ApplicationModule]
        })
        .compile()

        // Start the app
        app = moduleRef.createNestApplication();
        await app.init();
    })

    /**
     * Integration test for GET /coinsight/dex
     */
    it('GET /coinsight/dex', () => {
        return request(app.getHttpServer())
            .get('/coinsight/dex')
            .expect(200)
            .expect(expectedDEX);
    })

    /**
     * Integration test for GET /coinsight/dex/coinbase/products
     */
    it('GET /coinsight/dex/coinbase/products', () => {
        return request(app.getHttpServer())
            .get('/coinsight/dex/coinbase/products')
            .expect(200)
            .expect(expectedProducts);
    })

    /**
     * Integration test for GET /coinsight/dex/coinbase/products/btc-usd/stats
     */
    it('GET /coinsight/dex/coinbase/products/btc-usd/stats', () => {
        return request(app.getHttpServer())
            .get('/coinsight/dex/coinbase/products/btc-usd/stats')
            .expect(200)
            .expect((res: request.Response) => { 
                res.body['product'] == expectedStatsProduct ? true : false
            })
    })
})