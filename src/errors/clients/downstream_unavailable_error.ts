/**
 * Error used when a downstream service is not available.
 */
 export class DownstreamUnavailableError extends Error {

    constructor(m: string) {
        super(m)

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, DownstreamUnavailableError.prototype)
    }
}