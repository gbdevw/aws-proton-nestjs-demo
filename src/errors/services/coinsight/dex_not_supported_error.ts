/**
 * Error used when a requested DEX is not supported.
 */
 export class DEXNotSupportedError extends Error {

    constructor(m: string) {
        super(m)

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, DEXNotSupportedError.prototype)
    }
}