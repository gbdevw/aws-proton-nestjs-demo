// Import NestJS libs
import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Import application config. properties
import { ApplicationConfigProvider } from '../../configuration/providers/application/application_config_provider'

/**
 * Middleware that logs request and responses
 */
@Injectable()
export class LoggingMiddleware implements NestMiddleware {

    /**
     * Logger
     */
    private readonly logger: Logger = new Logger(LoggingMiddleware.name)

    /**
     * Service name
     */
    private service: string

    /**
     * Instance name
     */
    private instance: string

    /**
     * Constructor
     * @param application_settings Application settings used to enhance logging
     */
    constructor(application_settings: ApplicationConfigProvider) {
        this.service = application_settings.applicationConfigProperties.service
        this.instance = application_settings.applicationConfigProperties.instance
    }

    /**
     * Log request & response
     * @param req Incoming request
     * @param res Outgoing response
     * @param next Next middleware
     */
    use(req: Request, res: Response, next: NextFunction) {

        // Log request
        this.logger.log(
            `{
                "service": "${this.service}", 
                "instance": "${this.instance}", 
                "timestamp": "${Date.now().toString()}", 
                "correlation": "${req.get('x-correlation-id') || 'null'}",
                "type": "api-request",
                "method": "${req.method}",
                "path": "${req.path}"
            }`)
       
        // Next middleware
        next();

        // Log response
        this.logger.log(
            `{
                "service": "${this.service}", 
                "instance": "${this.instance}", 
                "timestamp": "${Date.now().toString()}", 
                "correlation": "${req.get('x-correlation-id') || 'null'}",
                "type": "api-response",
                "code": "${res.statusCode}"
            }`)
    }
}
