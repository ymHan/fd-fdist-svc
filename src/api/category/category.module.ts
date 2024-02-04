import { Module } from '@nestjs/common';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from '@root/model/entities';
import { VideoRepository } from '@root/model/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([Video])],
  controllers: [CategoryController],
  providers: [CategoryService, VideoRepository],
})
export class CategoryModule {}
