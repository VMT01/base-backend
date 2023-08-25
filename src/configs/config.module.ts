import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import { EEnvKey } from '@constants/env.constant';

const validationSchema = Joi.object({
    [EEnvKey.NODE_ENV]: Joi.string().valid('development', 'testing', 'production', 'staging').default('development'),
    [EEnvKey.PORT]: Joi.number().required(),
    [EEnvKey.API_PREFIX]: Joi.string(),
    [EEnvKey.SWAGGER_PATH]: Joi.string(),

    // JWT
    [EEnvKey.JWT_ACCESS_SECRET_KEY]: Joi.string().required(),
    [EEnvKey.JWT_ACCESS_EXPIRE_TIME]: Joi.string(),
    [EEnvKey.JWT_REFRESH_SECRET_KEY]: Joi.string().required(),
    [EEnvKey.JWT_REFRESH_EXPIRE_TIME]: Joi.string(),

    // Database
    [EEnvKey.DB_TYPE]: Joi.string().required(),
    [EEnvKey.DB_HOST]: Joi.string().required(),
    [EEnvKey.DB_PORT]: Joi.number().required(),
    [EEnvKey.DB_USERNAME]: Joi.string().required(),
    [EEnvKey.DB_PASSWORD]: Joi.string().required(),
    [EEnvKey.DB_DATABASE]: Joi.string().required(),
    [EEnvKey.TEST_DB_HOST]: Joi.string(),
    [EEnvKey.TEST_DB_PORT]: Joi.number(),
    [EEnvKey.TEST_DB_USERNAME]: Joi.string(),
    [EEnvKey.TEST_DB_PASSWORD]: Joi.string(),
    [EEnvKey.TEST_DB_DATABASE]: Joi.string(),
    [EEnvKey.PRODUCT_DB_HOST]: Joi.string(),
    [EEnvKey.PRODUCT_DB_PORT]: Joi.number(),
    [EEnvKey.PRODUCT_DB_USERNAME]: Joi.string(),
    [EEnvKey.PRODUCT_DB_PASSWORD]: Joi.string(),
    [EEnvKey.PRODUCT_DB_DATABASE]: Joi.string(),

    // Web3
    [EEnvKey.WEB3_PROVIDER]: Joi.string().required(),
    [EEnvKey.MESSAGE_FOR_SIGN]: Joi.string().required(),
});

@Global()
@Module({
    imports: [ConfigModule.forRoot({ validationSchema })],
    providers: [ConfigService],
    exports: [ConfigService],
})
export class ConfigureModule {}
