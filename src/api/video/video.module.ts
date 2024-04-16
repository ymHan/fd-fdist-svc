import { Module } from '@nestjs/common';

import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoRepository } from '@root/model/repositories';
import { Video, VideoEntity, ReportEntity, UserAccountEntity } from '@/model/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Video, ReportEntity, VideoEntity, UserAccountEntity])],
  controllers: [VideoController],
  providers: [VideoService, VideoRepository],
})
export class VideoModule {}
