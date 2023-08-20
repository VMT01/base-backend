import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { log } from '@shared/utils/logger.util';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, _: Response, next: NextFunction) {
        log('logger.middleware.ts:9', [{ ip: req.ip, url: req.url, method: req.method }]);
        next();
    }
}
