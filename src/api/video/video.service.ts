import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '@entities/index';
import { GetVideoListResponse } from '@proto/fdist.pb';
import { VideoRepository } from '@root/model/repositories';

@Injectable()
export class VideoService {
  @InjectRepository(Video)
  private readonly videoRepository: Repository<Video>;

  //constructor(private readonly videoRepository: VideoRepository) {}

  public async getVideos(): Promise<any> {
    const videos = await this.videoRepository.find();
    return {
      result: 'ok',
      status: 200,
      message: 'success',
      data: videos,
    }
  }
  async getVideoById(id: number) {
    return await this.videoRepository.findOne({ where: { id } });
  }
}
