import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { IResponse } from '@shared/interceptors/transform.interceptor';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();

        const errorExtract =
            exception instanceof HttpException
                ? { httpStatus: exception.getStatus(), message: exception.message }
                : { httpStatus: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Unknown error occured' };

        const responseBody: IResponse<null> = {
            success: false,
            data: null,
            statusCode: errorExtract.httpStatus,
            message: errorExtract.message,
            _metadata: {
                timestamp: new Date().toISOString(),
                path: httpAdapter.getRequestUrl(ctx.getRequest()),
            },
        };
        httpAdapter.reply(ctx.getResponse(), responseBody, errorExtract.httpStatus);
    }
}
