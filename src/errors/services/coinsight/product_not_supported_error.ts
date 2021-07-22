/**
 * Error used when a requested product is not supported.
 */
 export class ProductNotSupportedError extends Error {

    constructor(m: string) {
        super(m)

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ProductNotSupportedError.prototype)
    }
}