/**
 * Error used when the client for a downstream service encounters an unexpected error.
 */
 export class ClientUnexpectedError extends Error {

    constructor(m: string) {
        super(m)

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ClientUnexpectedError.prototype)
    }
}