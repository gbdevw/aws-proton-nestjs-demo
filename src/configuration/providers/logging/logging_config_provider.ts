// NestJS imports
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

// Import interface
import { LoggingConfigProperties } from '../../properties/logging/logging_config_properties'

/**
 * Injectable config. for logging properties
 */
@Injectable()
export class LoggingConfigProvider {

    /**
     * NestJS Config. service
     */
    private configService: ConfigService

    /**
     * Constructor
     * @param configService NestJS Config. service
     */
    constructor(configService: ConfigService) {
        this.configService = configService
    }

    /**
     * Custom getter to get logging properties from config. service.
     * 
     * @returns LoggingConfigProvider - Logging properties
     */
    get loggingConfigProperties (): LoggingConfigProperties {
        return this.configService.get<LoggingConfigProperties>('logging')
    }
}