/**
 * Error used when a service is temporarely unavailable.
 */
 export class ServiceUnavailableError extends Error {

    constructor(m: string) {
        super(m)

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ServiceUnavailableError.prototype)
    }
}