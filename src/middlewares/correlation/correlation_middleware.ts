// Import NestJS libs
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Import 3rd party
import {v4 as uuidv4} from 'uuid';

/**
 * Middleware that creates or use a client provided correlation ID and transaction ID.
 * 
 * The correlation ID can be propagated to downstream services and be used to correlate logs, traces, ...
 * The expected/provided correlation ID header is 'x-correlation-id'.
 * 
 * The transaction ID can be provided by the client and is returned with the 'x-transaction-id' header.
 */
@Injectable()
export class CorrelationMiddleware implements NestMiddleware {

    /**
     * Add correlation and transaction IDs
     * @param req Incoming request
     * @param res Outgoing response
     * @param next Next middleware
     */
    use(req: Request, res: Response, next: NextFunction) {

        // Add IDs to request context through headers
        var correlation = uuidv4()
        var transaction = req.get('x-transaction-id') || uuidv4()
        req.headers['x-correlation-id'] = correlation
        req.headers['x-transaction-id'] = transaction

        // Next middleware
        next();

        // Add headers to response
        res.setHeader('x-correlation-id', correlation)
        res.setHeader('x-transaction-id', transaction)
    }
}
