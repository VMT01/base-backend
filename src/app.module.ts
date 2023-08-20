import { ClassSerializerInterceptor, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import CONFIGS from '@configs/index';

import MODULES from '@modules/index';

import { LoggerMiddleware } from '@shared/middlewares/logger.middleware';

import { AppController } from './app.controller';

@Module({
    imports: [...CONFIGS, ...MODULES],
    controllers: [AppController],
    providers: [{ provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
