// Import NestJS libs
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

// Import API modules
import { CoinsightAPIModule } from './routes/coinsight/coinsight_api_module';

// Import config. mude
import { CoinsightConfigurationModule } from './configuration/coinsight_configuration_module'

// Import middlewares
import { CorrelationMiddleware } from './middlewares/correlation/correlation_middleware'
import { LoggingMiddleware } from './middlewares/logging/logging_middleware'

// Import controllers
import { CoinsightController } from './routes/coinsight/coinsight_controller'

@Module({
  imports: [
    CoinsightAPIModule,
    CoinsightConfigurationModule
  ]
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorrelationMiddleware, LoggingMiddleware)
      .forRoutes(CoinsightController);
  }
}
