// NestJS imports
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

// Import interface
import { ApplicationConfigProperties } from '../../properties/application/application_config_properties'

/**
 * Injectable config. for application properties
 */
@Injectable()
export class ApplicationConfigProvider {

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
     * Custom getter to get application properties from config. service.
     * 
     * @returns ApplicationConfigProperties - Application properties
     */
    get applicationConfigProperties (): ApplicationConfigProperties {
        return this.configService.get<ApplicationConfigProperties>('application')
    }
}