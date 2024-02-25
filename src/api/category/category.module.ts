import { Module } from '@nestjs/common';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Video, SubCategory } from '@entities/index';
import { VideoRepository } from '@root/model/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([Video, SubCategory])],
  controllers: [CategoryController],
  providers: [CategoryService, VideoRepository],
})
export class CategoryModule {}
