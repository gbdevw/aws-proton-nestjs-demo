/**
 * Error used when a service encounters an error.
 */
 export class ServiceInternalError extends Error {

    constructor(m: string) {
        super(m)

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ServiceInternalError.prototype)
    }
}