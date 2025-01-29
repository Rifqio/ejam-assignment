import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

// This middleware logs the request method and URL. If the request method is POST or PATCH, it also logs the request body.
@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger(RequestLoggerMiddleware.name);
    use(req: Request, _: Response, next: NextFunction) {
        if (req.method === 'POST' || req.method === 'PATCH') {
            this.logger.log(`[${req.method}] ${req.originalUrl} | Payload: ${JSON.stringify(req.body)}`);
        } else {
            this.logger.log(`[${req.method}] ${req.originalUrl}`);
        }
        next();
    }
}