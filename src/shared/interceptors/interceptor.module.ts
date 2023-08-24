import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { TransformInterceptor } from './transform.interceptor';

@Module({
    imports: [],
    controllers: [],
    providers: [
        { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
        { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    ],
    exports: [],
})
export class InterceptorModule {}
