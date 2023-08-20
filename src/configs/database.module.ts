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
                const options: TypeOrmModuleOptions = {
                    type: 'postgres',
                    host: configService.get<string>(EEnvKey.DB_HOST),
                    port: configService.get<number>(EEnvKey.DB_PORT),
                    username: configService.get<string>(EEnvKey.DB_USERNAME),
                    password: configService.get<string>(EEnvKey.DB_PASSWORD),
                    database: configService.get<string>(EEnvKey.DB_DATABASE),
                    synchronize: true,
                    logging: true,
                    autoLoadEntities: true,
                    migrationsTableName: 'migration',
                    entities: [__dirname + './../entities/**/*.entity.{ts,js}'],
                    migrations: [__dirname + './../database/migrations/*.{ts,js}'],
                };
                return options;
            },
            dataSourceFactory: async options => {
                const dataSource = await new DataSource(options).initialize();
                return dataSource;
            },
        }),
    ],
})
export class DatabaseModule {}
