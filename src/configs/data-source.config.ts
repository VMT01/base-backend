import * as env from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

env.config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: true,
    entities: [__dirname + './../entities/**/*.entity.{ts,js}'],
    migrations: [__dirname + './../database/migrations/*.{ts,js}'],
    migrationsTableName: 'migration',
};

export default new DataSource(dataSourceOptions);
