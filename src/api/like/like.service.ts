import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeEntity } from '@/model/entities/';
import { Video, VideoEntity } from '@entities/index';
import { GetLikeCheckRequest, GetLikeCheckResponse, ToggleLikeRequest, ToggleLikeResponse } from '@proto/fdist.pb';

@Injectable()
export class LikeService {
  @InjectRepository(LikeEntity)
  private readonly likeRepository: Repository<LikeEntity>;
  @InjectRepository(Video)
  private readonly videoRepository: Repository<Video>;
  @InjectRepository(VideoEntity)
  private readonly videoEntityRepository: Repository<VideoEntity>;

  public async getLikeCheck(payload: GetLikeCheckRequest): Promise<GetLikeCheckResponse> {
    const tmpLike = await this.likeRepository.findOne({ where: { userId: payload.userId, videoId: payload.videoId } });
    if (tmpLike) {
      return {
        result: 'ok',
        status: 200,
        message: 'success',
        data: [
          {
            result: true,
          },
        ],
      };
    } else {
      return {
        result: 'ok',
        status: 200,
        message: 'success',
        data: [
          {
            result: false,
          },
        ],
      };
    }
  }

  public async toggleLike(payload: ToggleLikeRequest): Promise<ToggleLikeResponse> {
    const tmpLike = await this.likeRepository.findOne({ where: { userId: payload.userId, videoId: payload.videoId } });

    if (tmpLike) {
      const video = await this.videoEntityRepository.findOne({ where: { id: payload.videoId } });
      video.like_count -= 1;
      await this.videoEntityRepository.save(video);
      await this.likeRepository.delete({
        userId: payload.userId,
        videoId: payload.videoId,
      });

      return {
        result: 'ok',
        status: 200,
        message: 'success',
        data: [
          {
            result: false,
            likeCount: video.like_count,
          },
        ],
      };
    } else {
      const like = new LikeEntity();
      like.userId = payload.userId;
      like.videoId = payload.videoId;
      await this.likeRepository.save(like);
      const video = await this.videoEntityRepository.findOne({ where: { id: payload.videoId } });
      video.like_count += 1;
      await this.videoEntityRepository.save(video);

      return {
        result: 'ok',
        status: 200,
        message: 'success',
        data: [
          {
            result: true,
            likeCount: video.like_count,
          },
        ],
      };
    }
  }
}
