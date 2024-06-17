import { Module } from '@nestjs/common';

import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoRepository, VideoEntityRepository } from '@root/model/repositories';
import {
  Video,
  VideoEntity,
  ReportEntity,
  UserAccountEntity,
  VenueBackofficeEntity,
  ivod_process_entity,
  CommonCodeEntity,
} from '@/model/entities';
import { ViewVideo } from '@/model/view';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Video,
      ReportEntity,
      VideoEntity,
      UserAccountEntity,
      ViewVideo,
      VenueBackofficeEntity,
      ivod_process_entity,
      CommonCodeEntity,
    ]),
  ],
  controllers: [VideoController],
  providers: [VideoService, VideoRepository, VideoEntityRepository],
})
export class VideoModule {}
