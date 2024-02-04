import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig = require('./config/ormconfig');

import { VideoModule } from './api/video/';
import { CategoryModule } from '@root/api/category';
import { LikeModule } from '@root/api/like';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig[0]), VideoModule, CategoryModule, LikeModule],
})
export class AppModule {}
