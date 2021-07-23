// Import NestJS testing utilities
import { Test } from '@nestjs/testing';

// Import YAML source
import { load_yaml_config } from '../../../../../src/configuration/sources/yaml/config_source_yaml'

// Import 3rd party
import { join } from 'path';

/**
 * TEST : Load configuration keys from a YAML file
 */
test('Configuration - Sources - Load config. keys from YAML file', () => {
  
    // Load config. from yaml
    let config = load_yaml_config(join(__dirname, './test_config.yaml'))

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
});