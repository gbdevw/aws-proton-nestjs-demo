// Import NestJS testing utilities
import { Test } from '@nestjs/testing';

// Import NestJS
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Import config. providers
import { ApplicationConfigProvider } from '../../../src/configuration/providers/application/application_config_provider'
import { ConsightConfigProvider } from '../../../src/configuration/providers/coinsight/coinsight_config_provider'
// Import config. factory
import configuration from '../../../src/configuration/configuration';

// Import 3rd party
import { join } from 'path';

/**
 * Regular cases test suite
 */
describe('Configuration - Test configuration providers with YAML source  - Regular cases', () => {

  // Test suite globals
  let applicationConfigProvider: ApplicationConfigProvider;
  let consightConfigProvider: ConsightConfigProvider;

  /**
   * Load config using the Config module
   */
  beforeAll(async () => {

    // Define env. variables to fetch YAML config.
    process.env.YAML_CONFIG_ENABLED = 'true'
    process.env.YAML_CONFIG_PATH = join(__dirname, './test_config.yaml')

    // Compile Module with ConfigService (improted) and config. providers
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [ApplicationConfigProvider, ConsightConfigProvider],
      imports: [
        ConfigModule.forRoot({
          load: [configuration]
        })
      ]
    }).compile();

    applicationConfigProvider = moduleRef.get<ApplicationConfigProvider>(ApplicationConfigProvider);
    consightConfigProvider = moduleRef.get<ConsightConfigProvider>(ConsightConfigProvider);
  });

  test('Configuration - Test ApplicationConfigProvider', () => {
    // Test application related keys
    expect(applicationConfigProvider.applicationConfigProperties.service).toBe('Coinsight API')
    expect(applicationConfigProvider.applicationConfigProperties.instance).toBe('coinsight-x')
  });

  test('Configuration - Test ConsightConfigProvider', () => {
    // Test coinsight related keys
    // Coinbase
    expect(consightConfigProvider.coinsightConfigProperties.coinbase.enabled).toBe(true)
    expect(consightConfigProvider.coinsightConfigProperties.coinbase.url).toBe('https://api-public.sandbox.pro.coinbase.com')
    expect(consightConfigProvider.coinsightConfigProperties.coinbase.products.length).toBe(2)
    expect(consightConfigProvider.coinsightConfigProperties.coinbase.products.includes('btc-usd')).toBeTruthy
    expect(consightConfigProvider.coinsightConfigProperties.coinbase.products.includes('eth-eur')).toBeTruthy
    // Kraken
    // Kraken
    expect(consightConfigProvider.coinsightConfigProperties.kraken.enabled).toBe(true)
    expect(consightConfigProvider.coinsightConfigProperties.kraken.url).toBe('https://api.kraken.com/0')
    expect(consightConfigProvider.coinsightConfigProperties.kraken.products.length).toBe(1)
    expect(consightConfigProvider.coinsightConfigProperties.kraken.products.includes('xxbtzusd')).toBeTruthy
  });
});