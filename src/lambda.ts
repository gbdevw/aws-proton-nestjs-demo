// Import express & lambda required libs
import { Handler, Context } from 'aws-lambda';
import { Server } from 'http';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
const express = require('express');
var cors = require('cors')

// Import NestJS libs
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';

// Import application module
import { ApplicationModule } from './application_module';

  // Config. X-Ray
  var AWSXRay = require('aws-xray-sdk');
  AWSXRay.captureHTTPsGlobal(require('http'));
  AWSXRay.capturePromise();
    

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this
// is likely due to a compressed response (e.g. gzip) which has not
// been handled correctly by aws-serverless-express and/or API
// Gateway. Add the necessary MIME types to binaryMimeTypes below
const binaryMimeTypes: string[] = [];

// Reuse server from existing lambda context
let cachedServer: Server;

/**
 * Create server
 * @returns Application server
 */
async function bootstrapServer(): Promise<Server> {
  // If server does not exist yet - else, reuse
  if (!cachedServer) {
    // Create app
    const expressApp = express();
    const nestApp = await NestFactory.create(ApplicationModule, new ExpressAdapter(expressApp))

    // Set express middlewares
    nestApp.use(eventContext(), cors(), AWSXRay.express.openSegment('Coinsight API'));
    await nestApp.init();
    cachedServer = createServer(expressApp, undefined,
      binaryMimeTypes);
  }

  // Return server
  return cachedServer;
}

// Export the handler : the entry point of the Lambda function
export const handler: Handler = async (event: any, context: Context) => {
  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
}