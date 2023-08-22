import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

import { log } from '@shared/utils/logger.util';

export const UserPayload = createParamDecorator((_data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    log('user-payload.decorator.ts:7', [request.user]);
    return request.user;
});
