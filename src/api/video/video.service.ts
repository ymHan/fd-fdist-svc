import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '@entities/index';
import { GetVideoListResponse, GetVideoByIdRequest, GetVideoByIdResponse } from '@proto/fdist.pb';
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
  async getVideoById(payload: GetVideoByIdRequest): Promise<any> {
    const video = await this.videoRepository.findOne({ where: { id: payload.id } });
    console.log(video);
    return {
      result: 'ok',
      status: 200,
      message: 'success',
      data: video,
    }
  }
}
