import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category, CategorySubEnum, RecordType } from '@enum/index';
import { User, Video } from '@entities/index';
import { AddMwcRequest, TogglePublishedRequest, UpdateVideoMetaInfoRequest, DeleteVideoRequest } from '@proto/fdist.pb';
import * as fs from 'fs';
import * as fsp from 'fs/promises';
import { mkdirp } from 'mkdirp';
import * as dotenv from 'dotenv';

import FfmpegCommand from 'fluent-ffmpeg';

dotenv.config();

@Injectable()
export class MwcEventService {
  @InjectRepository(Video)
  private readonly videoRepository: Repository<Video>;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  public async DeleteVideo(payload: DeleteVideoRequest): Promise<any> {
    const { userId, videoId } = payload;
    const video = await this.videoRepository.findOne({ where: { email: userId, id: videoId } });
    if (!video) {
      return {
        result: 'fail',
        status: 400,
        message: 'video not found',
        data: null,
      };
    }
    video.isDeleted = !video.isDeleted;
    await this.videoRepository.save(video);

    return {
      result: 'ok',
      status: 200,
      message: 'success',
      data: null,
    };
  }

  public async ToggleMwcPublish(payload: TogglePublishedRequest): Promise<any> {
    const { userId, videoId } = payload;
    const video = await this.videoRepository.findOne({ where: { email: userId, id: videoId } });
    if (!video) {
      return {
        result: 'fail',
        status: 400,
        message: 'video not found',
        data: null,
      };
    }
    video.isPublished = !video.isPublished;
    const result = await this.videoRepository.save(video);
    return {
      result: 'ok',
      status: 200,
      message: 'success',
      data: result,
    };
  }
  public async UpdateMwcMetaInfo(payload: UpdateVideoMetaInfoRequest): Promise<any> {
    const { userEmail, videoId, title, subTitle, description } = payload;
    const video = await this.videoRepository.findOne({ where: { email: userEmail, id: videoId } });
    if (!video) {
      return {
        result: 'fail',
        status: 400,
        message: 'video not found',
        data: null,
      };
    }
    video.title = title;
    video.subTitle = subTitle;
    video.description = description;
    const result = await this.videoRepository.save(video);
    return {
      result: 'ok',
      status: 200,
      message: 'success',
      data: result,
    };
  }

  public async existMwc(payload: AddMwcRequest): Promise<any> {
    const { userId, fileName } = payload;
    const QueryBuilder = this.videoRepository.createQueryBuilder('video');
    const video = QueryBuilder.where('video.email = :userId', { userId }).andWhere(
      "array_to_string(video.contentUrlList, '||') like %:fileName%",
      { fileName },
    );

    if (!video) {
      return {
        result: 'success',
        status: 200,
        message: 'file not exists',
        data: null,
      };
    } else {
      return {
        result: 'fail',
        status: 400,
        message: 'file exists',
        data: null,
      };
    }
  }

  public async addMwc(payload: AddMwcRequest): Promise<any> {
    const { userId, fileName } = payload;
    const user = await this.userRepository.findOne({ where: { email: userId } });
    const file = fs.existsSync(`${process.env.MWC_FILE_PATH}/${this.getDates()}/${fileName}`);
    if (!user) {
      return {
        result: 'fail',
        status: 400,
        message: 'user not found',
        data: null,
      };
    }
    if (!file) {
      return {
        result: 'fail',
        status: 400,
        message: 'file not found',
        data: null,
      };
    }
    console.log(file);
    console.log(fileName)
    const duration: number = await this.getDuration(fileName);
    const video = new Video();

    video.email = user.email;
    video.title = 'MWC Event';
    video.subTitle = 'MWC Event';
    video.description = 'MWC Event';
    video.ownerName = user.name;
    video.ownerNickName = user.nickname;
    video.ownerChannelName = user.nickname;
    video.ownerProfileIconUrl = null;
    video.thumbnailUrl = `http://cdn.4dist.com/${user.email}/${fileName.split('.')[0]}.png`;
    video.duration = (duration * 1000).toString() || '0';
    video.category = Category.ENTERTAINMENTS;
    video.categorySub = CategorySubEnum.MWC;
    video.categorySubCode = CategorySubEnum.MWC;
    video.recordType = RecordType.SHORTS;
    video.contentUrlList = [`http://cdn.4dist.com/${user.email}/${fileName}`];
    video.poseIndicatorList = [];
    video.nodeId = 'MWC0001001001';
    console.log(video);
    const returnData = await this.videoRepository.save(video);
    await this.moveFile(fileName, user.email);

    return {
      result: 'ok',
      status: 200,
      message: 'success',
      data: returnData,
    };
  }

  private getDates() {
    let months = '';
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    if (month < 10) {
      months = `0${month}`;
    }
    const day = date.getDate();
    return `${year}${months}${day}`;
  }

  private async getDuration(fileName: string): Promise<number> {
    return new Promise((resolve, reject) => {
      FfmpegCommand.ffprobe(`${process.env.MWC_FILE_PATH}/mwc/${this.getDates()}/video/${fileName}`, (err, metadata) => {
        if (err) {
          reject(err);
        }
        resolve(metadata.format.duration);
      });
    });
  }

  private async moveFile(fileName: string, userEmail: string) {
    const file = fileName.split('.')[0];
    await mkdirp(`${process.env.MWC_FILE_PATH}/${userEmail}`);
    await fsp.rename(
      `${process.env.MWC_FILE_PATH}/mwc/${this.getDates()}/${fileName}`,
      `${process.env.MWC_FILE_PATH}/${userEmail}/${fileName}`,
    );
    await fsp.rename(
      `${process.env.MWC_FILE_PATH}/mwc/${this.getDates()}/${file}.png`,
      `${process.env.MWC_FILE_PATH}/${userEmail}/${file}.png`,
    );
  }
}
