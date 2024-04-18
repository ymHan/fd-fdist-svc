import { Module } from '@nestjs/common';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Video, SubCategory, CommonCode, VideoEntity, ItemDetails } from '@entities/index';
import { VideoRepository } from '@root/model/repositories';
import { VideoEntityRepository } from '@root/model/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([Video, SubCategory, CommonCode, VideoEntity, ItemDetails])],
  controllers: [CategoryController],
  providers: [CategoryService, VideoRepository, VideoEntityRepository],
})
export class CategoryModule {}
