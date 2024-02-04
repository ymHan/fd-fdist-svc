import { Module } from '@nestjs/common';

import { LikeController } from '@root/api/like/like.controller';
import { LikeService } from '@root/api/like/like.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from '@root/model/entities';
import { Like } from '@root/model/entities';
import { VideoRepository } from '@root/model/repositories';
import { LikeRepository } from '@root/model/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([Video, Like])],
  controllers: [LikeController],
  providers: [LikeService, VideoRepository, LikeRepository],
})
export class LikeModule {}
