import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { Video } from '@/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature(),
  ],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
