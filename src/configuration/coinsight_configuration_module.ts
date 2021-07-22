// Import NESTJS libis
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Import config. providers
import { ApplicationConfigProvider } from './providers/application/application_config_provider'
import { ConsightConfigProvider } from './providers/coinsight/coinsight_config_provider'
import { LoggingConfigProvider } from './providers/logging/logging_config_provider'

// Import config. factory
import configuration from './configuration';

/**
 * Module that wraps up all dependencies for configuration.
 */
@Module({
    controllers: [],
    providers: [ApplicationConfigProvider, ConsightConfigProvider, LoggingConfigProvider],
    imports: [
    ConfigModule.forRoot({
        load: [configuration]
    })
    ],
    exports: [ApplicationConfigProvider, ConsightConfigProvider, LoggingConfigProvider]
})
export class CoinsightConfigurationModule {}