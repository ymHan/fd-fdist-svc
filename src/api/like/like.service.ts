import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '@entities/index';
import { Video } from '@entities/index';
import { ToggleLikeRequest, ToggleLikeResponse } from '@proto/fdist.pb';

@Injectable()
export class LikeService {
  @InjectRepository(Like)
  private readonly likeRepository: Repository<Like>;
  @InjectRepository(Video)
  private readonly videoRepository: Repository<Video>;

  public async toggleLike(payload: ToggleLikeRequest): Promise<ToggleLikeResponse> {
    const tmpLike = await this.likeRepository.findOne({ where: { userId: payload.userId, videoId: payload.videoId } });

    if (tmpLike) {
      const video = await this.videoRepository.findOne({ where: { id: payload.videoId } });
      video.likesCount -= 1;
      await this.videoRepository.save(video);
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
          },
        ],
      };
    } else {
      const like = new Like();
      like.userId = payload.userId;
      like.videoId = payload.videoId;
      await this.likeRepository.save(like);
      const video = await this.videoRepository.findOne({ where: { id: payload.videoId } });
      video.likesCount += 1;
      await this.videoRepository.save(video);

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
    }
  }
}
