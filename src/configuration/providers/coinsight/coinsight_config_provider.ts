// NestJS imports
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

// Import interface
import { CoinsightConfigProperties } from '../../properties/coinsight/coinsight_config_properties'

/**
 * Injectable config. for coinsight properties
 */
@Injectable()
export class ConsightConfigProvider {

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
     * Custom getter to get coinsight properties from config. service.
     * 
     * @returns CoinsightConfigProperties - Coinsight properties
     */
    get coinsightConfigProperties (): CoinsightConfigProperties {
        return this.configService.get<CoinsightConfigProperties>('coinsight')
    }
}