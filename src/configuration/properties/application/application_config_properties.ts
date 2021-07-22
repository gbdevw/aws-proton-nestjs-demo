/**
 * interface that defines general application settings.
 */
export interface ApplicationConfigProperties {
    
    /**
     * Port to use to listen for incoming requests.
     * Defaults to 3000
     */
    port: number

    /**
     * Interfaces to listen on.
     */
    hostname: string

    /**
     * Service name.
     */
    service: string

    /**
     * Name of the instance of the application within the service.
     */
    instance: string
}