/**
 * interface that defines general application settings.
 */
export interface ApplicationConfigProperties {

    /**
     * Service name.
     */
    service: string

    /**
     * Name of the instance of the application within the service.
     */
    instance: string
}