// Import NESTJS libs
import { Module } from '@nestjs/common';

// Import service. module
import { CoinsightServiceModule } from '../../services/coinsight/coinsight_service_module'

// Import controller
import { CoinsightController } from './coinsight_controller'

/**
 * Module that wraps up all dependencies for the Coinsight API
 */
@Module({
    controllers: [CoinsightController],
    imports: [CoinsightServiceModule]
})
export class CoinsightAPIModule {}