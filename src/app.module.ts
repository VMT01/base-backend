import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import CONFIGS from '@configs/index';

import MODULES from '@modules/index';

import { AllExceptionsFilter } from '@shared/exception-filters/all.exception-filter';
import { InterceptorModule } from '@shared/interceptors/interceptor.module';

import { AppController } from './app.controller';

@Module({
    imports: [...CONFIGS, ...MODULES, InterceptorModule],
    controllers: [AppController],
    providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }],
})
export class AppModule {}
