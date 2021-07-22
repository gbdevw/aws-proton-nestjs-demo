// Import NestJS
import { Controller, Get, Logger, HttpException, Param, HttpStatus } from '@nestjs/common';

// Import service interface
import { CoinsightProductServiceInterface } from '../../services/coinsight/coinsight_product_service_interface';

// Import DTO
import { ProductStatsDTO } from '../../dto/product_stats_dto'

// Import service errors
import { DEXNotSupportedError } from '../../errors/services/coinsight/dex_not_supported_error'
import { ProductNotSupportedError } from '../../errors/services/coinsight/product_not_supported_error'
import { ServiceInternalError } from '../../errors/services/service_internal_error'
import { ServiceUnavailableError } from '../../errors/services/service_unavailable_error'

/**
 * Controller for Coinsight API
 */
@Controller('coinsight')
export class CoinsightController {

  /**
   * Map each exchange name the list of supported products
   */
   private coinsightService: CoinsightProductServiceInterface

   /**
    * Logger
    */
   private readonly logger = new Logger(CoinsightController.name)

  /**
   * Constructor.
   * 
   * @param coinsightService Business logic for the API
   */
  constructor(coinsightService: CoinsightProductServiceInterface) {
    this.coinsightService = coinsightService
  }

  /**
   * List all supported exchanges
   * @returns A list of the names of the supported exchanges
   */
  @Get('dex')
  getSupportedDEX (): string[] {

    // Use the servcie to get all supported exchanges
    this.logger.debug('Listing exchanges')
    return this.coinsightService.listDEX();
  }

  /**
   * List all supported products for a exchange
   * @param dex Targeted exchange
   * @returns List of supported products
   */
  @Get('dex/:dex/products')
  getSupportedProductsByDEX (@Param('dex') dex: string): string[] {

    try {
      // List all products for the requested exchange
      this.logger.debug(`Listing products for ${dex}`)
      return this.coinsightService.listSupportedProducts(dex)
    }
    catch(error) {
      // Check error type
      if (error instanceof DEXNotSupportedError) {
        // Throw BadRequest
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
      }
      else {
        // Reraise
        throw error
      }
    }
  }

  @Get('dex/:dex/products/:product/stats')
  async get24hProductStats (@Param('dex') dex: string, @Param('product') product: string): Promise<ProductStatsDTO> {

    try {
      // Get product stats on the targeted exchange
      this.logger.debug(`Gettings stats for ${product} on ${dex}`)
      return await this.coinsightService.get24hProductStatsAsync(dex, product)
    }
    catch(error) {
      // Check error type
      if (error instanceof DEXNotSupportedError || error instanceof ProductNotSupportedError) {
        // Throw BadRequest
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
      }
      if (error instanceof ServiceUnavailableError) {
        // Throw ServiceUnavailable
        throw new HttpException("Coinsight service is temporary unavaible", HttpStatus.SERVICE_UNAVAILABLE)
      }
      else {
        // Reraise - Will resolve to 500
        throw error
      }
    }
  }
}
