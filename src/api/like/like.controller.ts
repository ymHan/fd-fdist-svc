import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ToggleLikeRequest,
  ToggleLikeResponse,
  F_DIST_SERVICE_NAME,
  GetLikeCheckRequest,
  GetLikeCheckResponse,
} from '@proto/fdist.pb';
import { LikeService } from './like.service';
@Controller()
export class LikeController {
  @Inject(LikeService)
  private readonly service: LikeService;

  @GrpcMethod(F_DIST_SERVICE_NAME, 'ToggleLike')
  private toggleLike(payload: ToggleLikeRequest): Promise<ToggleLikeResponse> {
    return this.service.toggleLike(payload);
  }

  @GrpcMethod(F_DIST_SERVICE_NAME, 'GetLikeCheck')
  private getLikeCheck(payload: GetLikeCheckRequest): Promise<GetLikeCheckResponse> {
    return this.service.getLikeCheck(payload);
  }
}
