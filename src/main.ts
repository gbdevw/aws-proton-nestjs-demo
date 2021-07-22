// Import NestJS libs
import { NestFactory } from '@nestjs/core';

// Import application module
import { ApplicationModule } from './application_module';

async function bootstrap() {

  // Create application
  const app = await NestFactory.create(ApplicationModule);

  // Enable cors
  app.enableCors()

  // Start application
  await app.listen(3000);
}

bootstrap();
