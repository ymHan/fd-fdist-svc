import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { VideoService } from './video.service';
import { F_DIST_SERVICE_NAME, GetVideoByIdRequest, GetVideoListRequest, VIDEO_SERVICE_NAME } from '@proto/fdist.pb';

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

  @GrpcMethod(F_DIST_SERVICE_NAME, 'reportVideo')
  private reportVideo(payload: any): Promise<any> {
    return this.service.reportVideo(payload);
  }

  @GrpcMethod(F_DIST_SERVICE_NAME, 'getVideoRecordType')
  private getVideoRecordType(payload: any): Promise<any> {
    return this.service.getVideoRecordType(payload);
  }

  @GrpcMethod(F_DIST_SERVICE_NAME, 'myVideoList')
  private myVideoList(payload: any): Promise<any> {
    return this.service.myVideoList(payload);
  }

  @GrpcMethod(F_DIST_SERVICE_NAME, 'myVideoExists')
  private myVideoExists(payload: any): Promise<any> {
    return this.service.myVideoExists(payload);
  }

  @GrpcMethod(VIDEO_SERVICE_NAME,'deleteVideo')
  private deleteVideo(payload: any): Promise<any> {
    return this.service.deleteVideo(payload);
  }
}
