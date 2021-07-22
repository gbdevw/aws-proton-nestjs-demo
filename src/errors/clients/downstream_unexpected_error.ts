/**
 * Error used when an unexpected error occurs while interacting with a downstream service.
 */
 export class DownstreamUnexpectedError extends Error {

    constructor(m: string) {
        super(m)

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, DownstreamUnexpectedError.prototype)
    }
}