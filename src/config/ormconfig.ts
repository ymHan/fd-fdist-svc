import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export = [
  {
    type: process.env.DEFAULT_DB_TYPE,
    host: process.env.DEFAULT_DB_HOST,
    port: parseInt(process.env.DEFAULT_DB_PORT, 10),
    database: process.env.DEFAULT_DATABASE,
    username: process.env.DEFAULT_DB_USER,
    password: process.env.DEFAULT_DB_PASSWORD,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  } as TypeOrmModuleOptions,
  {
    name: process.env.SECOND_DB_NAME,
    type: process.env.SECOND_DB_TYPE,
    host: process.env.SECOND_DB_HOST,
    port: parseInt(process.env.SECOND_DB_PORT, 10),
    database: process.env.SECOND_DATABASE,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  } as TypeOrmModuleOptions,
];
