import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig = require('./config/ormconfig');
import { ConfigModule } from '@nestjs/config';

import { VideoModule } from './api/video/';
import { CategoryModule } from '@root/api/category';
import { LikeModule } from '@root/api/like';
import { MwcModule } from '@root/api/mwc';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.prod.env',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    TypeOrmModule.forRoot(ormConfig[0]),
    VideoModule,
    CategoryModule,
    LikeModule,
    MwcModule,
  ],
})
export class AppModule {}
