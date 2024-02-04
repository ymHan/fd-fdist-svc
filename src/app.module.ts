import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig = require('./config/ormconfig');

import { VideoModule } from './api/video/';
import { CategoryModule } from '@root/api/category';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig[0]), VideoModule, CategoryModule],
})
export class AppModule {}
