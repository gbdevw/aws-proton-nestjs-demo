// Import NESTJS libs
import { Module } from '@nestjs/common';

// Import config. module
import { CoinsightConfigurationModule } from '../../configuration/coinsight_configuration_module'

// Import service. impl. & interfaces
import { CoinsightProductServiceInterface } from './coinsight_product_service_interface'
import { CoinsightProductService } from './coinsight_product_service'

/**
 * Custom provider to provide implementation of CoinsightProductServiceInterface.
 */
export const coinsightServiceProvider = {
    provide: CoinsightProductServiceInterface,
    useClass: CoinsightProductService
};

/**
 * Module that wraps up all dependencies for the Coinsight service
 */
@Module({
    providers: [coinsightServiceProvider],
    imports: [CoinsightConfigurationModule],
    exports: [CoinsightProductServiceInterface]
})
export class CoinsightServiceModule {}