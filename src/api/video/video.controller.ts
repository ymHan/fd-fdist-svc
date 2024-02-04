import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { VideoService } from './video.service';
import { F_DIST_SERVICE_NAME, GetVideoListResponse, GetVideoByIdRequest, GetVideoListRequest } from '@proto/fdist.pb';


@Controller()
export class VideoController {
  @Inject(VideoService)
  private readonly service: VideoService;

  @GrpcMethod(F_DIST_SERVICE_NAME, 'getVideos')
  private getVideos(payload: GetVideoListRequest): Promise<any> {
    return this.service.getVideos(payload);
  }

  @GrpcMethod(F_DIST_SERVICE_NAME, 'getVideoById')
  private getVideoById(payload: GetVideoByIdRequest): Promise<any> {
    return this.service.getVideoById(payload);
  }
}
