/**
 * Error used when a downstream service signal an internal error has occured.
 */
export class DownstreamInternalError extends Error {

    constructor(m: string) {
        super(m)

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, DownstreamInternalError.prototype)
    }
}