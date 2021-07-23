// Import config. source
import { load_yaml_config_from_app_config_hosted } from '../../../../../../../../src/configuration/sources/aws/appconfig/hosted/yaml/config_source_aws_appconfig_hosted_yaml'

/**
 * Test configration from AWS App Config.
 */
describe('Test - Configuration Source - Aws App Config', () => {

    /**
     * Load a regular config. from AWS App Config.
     */
    test ('Load regular config. from AWS App Config', async () => {

        // Load config. from yaml
        let config = await load_yaml_config_from_app_config_hosted(
            'eu-west-1',
            'aws-proton-nest-js-demo',
            'dev',
            'app-config'
        )

        // Test application related keys
        expect(config.application.service).toBe('Coinsight API')
        expect(config.application.instance).toBe('coinsight-x')

        // Test application related keys
        // Coinbase
        expect(config.coinsight.coinbase.enabled).toBe(true)
        expect(config.coinsight.coinbase.url).toBe('https://api-public.sandbox.pro.coinbase.com')
        expect(config.coinsight.coinbase.products.length).toBe(2)
        expect(config.coinsight.coinbase.products.includes('btc-usd')).toBeTruthy
        expect(config.coinsight.coinbase.products.includes('eth-eur')).toBeTruthy
        // Kraken
        expect(config.coinsight.kraken.enabled).toBe(true)
        expect(config.coinsight.kraken.url).toBe('https://api.kraken.com/0')
        expect(config.coinsight.kraken.products.length).toBe(1)
        expect(config.coinsight.kraken.products.includes('xxbtzusd')).toBeTruthy
    })
});