import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig = require('./config/ormconfig');

import { VideoModule } from './api/video/';
@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig[0]),
    VideoModule,
  ],
})
export class AppModule {}
