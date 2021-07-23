// Import NESTJS libis
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Import config. providers
import { ApplicationConfigProvider } from './providers/application/application_config_provider'
import { ConsightConfigProvider } from './providers/coinsight/coinsight_config_provider'

// Import config. factory
import configuration from './configuration';

/**
 * Module that wraps up all dependencies for configuration.
 */
@Module({
    controllers: [],
    providers: [ApplicationConfigProvider, ConsightConfigProvider],
    imports: [
    ConfigModule.forRoot({
        load: [configuration]
    })
    ],
    exports: [ApplicationConfigProvider, ConsightConfigProvider]
})
export class CoinsightConfigurationModule {}