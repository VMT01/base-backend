import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface IResponse<T> {
    success: boolean;
    data?: T;
    statusCode?: HttpStatus;
    message?: string;
    _metadata?: { [key: string]: any };
}

function buildResponse<T>(data: any, executeTime: number): IResponse<T> {
    const { data: response, ...res } = data;

    return response
        ? {
              success: true,
              data: response,
              statusCode: HttpStatus.OK,
              message: null,
              _metadata: { timestamp: new Date().toISOString(), executeTime, ...res },
          }
        : {
              success: true,
              data: data || null,
              statusCode: HttpStatus.OK,
              message: null,
              _metadata: { timestamp: new Date().toISOString(), executeTime },
          };
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
    intercept(
        _context: ExecutionContext,
        next: CallHandler<T>,
    ): Observable<IResponse<T>> | Promise<Observable<IResponse<T>>> {
        const start = performance.now();

        return next.handle().pipe(
            map(data => {
                const end = performance.now();
                return buildResponse(data, end - start);
            }),
        );
    }
}
