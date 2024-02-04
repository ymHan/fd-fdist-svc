import { Module } from '@nestjs/common';

import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from '@root/model/entities';
import { VideoRepository } from '@root/model/repositories';
import { ReportEntity } from '@entities/report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Video, ReportEntity])],
  controllers: [VideoController],
  providers: [VideoService, VideoRepository],
})
export class VideoModule {}
