import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { EEnvKey } from '@constants/env.constant';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const nodeEnv = configService.get<string>(EEnvKey.NODE_ENV);
                const databaseConfig = { type: configService.get<string>(EEnvKey.DB_TYPE) };

                switch (nodeEnv) {
                    case 'development':
                        Object.assign(databaseConfig, {
                            host: configService.get<string>(EEnvKey.DB_HOST),
                            port: configService.get<number>(EEnvKey.DB_PORT),
                            username: configService.get<string>(EEnvKey.DB_USERNAME),
                            password: configService.get<string>(EEnvKey.DB_PASSWORD),
                            database: configService.get<string>(EEnvKey.DB_DATABASE),
                        });
                        break;
                    case 'testing':
                        Object.assign(databaseConfig, {
                            host: configService.get<string>(EEnvKey.TEST_DB_HOST),
                            port: configService.get<number>(EEnvKey.TEST_DB_PORT),
                            username: configService.get<string>(EEnvKey.TEST_DB_USERNAME),
                            password: configService.get<string>(EEnvKey.TEST_DB_PASSWORD),
                            database: configService.get<string>(EEnvKey.TEST_DB_DATABASE),
                        });
                        break;
                    case 'production':
                        Object.assign(databaseConfig, {
                            host: configService.get<string>(EEnvKey.PRODUCT_DB_HOST),
                            port: configService.get<number>(EEnvKey.PRODUCT_DB_PORT),
                            username: configService.get<string>(EEnvKey.PRODUCT_DB_USERNAME),
                            password: configService.get<string>(EEnvKey.PRODUCT_DB_PASSWORD),
                            database: configService.get<string>(EEnvKey.PRODUCT_DB_DATABASE),
                        });
                        break;
                    default:
                        Object.assign(databaseConfig, {
                            host: configService.get<string>(EEnvKey.DB_HOST),
                            port: configService.get<number>(EEnvKey.DB_PORT),
                            username: configService.get<string>(EEnvKey.DB_USERNAME),
                            password: configService.get<string>(EEnvKey.DB_PASSWORD),
                            database: configService.get<string>(EEnvKey.DB_DATABASE),
                        });
                        break;
                }

                const options = {
                    ...databaseConfig,
                    synchronize: true,
                    logging: true,
                    autoLoadEntities: true,
                    migrationsTableName: 'migration',
                    entities: [__dirname + './../entities/**/*.entity.{ts,js}'],
                    migrations: [__dirname + './../database/migrations/*.{ts,js}'],
                };
                return options as TypeOrmModuleOptions;
            },
            dataSourceFactory: async options => {
                const dataSource = await new DataSource(options).initialize();
                return dataSource;
            },
        }),
    ],
})
export class DatabaseModule {}
