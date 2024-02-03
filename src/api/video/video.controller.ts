import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { VideoService } from './video.service';
import { F_DIST_SERVICE_NAME, GetVideoListResponse } from '@proto/fdist.pb';


@Controller()
export class VideoController {
  @Inject(VideoService)
  private readonly service: VideoService;

  @GrpcMethod(F_DIST_SERVICE_NAME, 'getVideos')
  private getVideos(): Promise<GetVideoListResponse> {
    return this.service.getVideos();
  }

  @GrpcMethod(F_DIST_SERVICE_NAME, 'getVideoById')
  private getVideoById(id: number): Promise<any> {
    return this.service.getVideoById(id);
  }
}
