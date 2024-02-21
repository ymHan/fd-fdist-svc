import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category, CategorySubEnum, RecordType, CategorySubCodeEnum } from '@enum/index';
import { User, Video } from '@entities/index';
import { AddMwcRequest, ExistsMwcRequest, ExistsMwcResponse, UpdateVideoMetaInfoRequest } from '@proto/fdist.pb';
import * as fs from 'fs';
import * as fsp from 'fs/promises';
import * as dotenv from 'dotenv';
import * as FfmpegCommand from 'fluent-ffmpeg';

FfmpegCommand.setFfprobePath('/usr/bin/ffprobe');
FfmpegCommand.setFfmpegPath('/usr/bin/ffmpeg');

dotenv.config();

@Injectable()
export class MwcService {
  @InjectRepository(Video)
  private readonly videoRepository: Repository<Video>;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  public async updateVideoMetaInfo(payload: UpdateVideoMetaInfoRequest): Promise<any> {
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
    !!title ? (video.title = title) : null;
    !!subTitle ? (video.subTitle = subTitle) : null;
    !!description ? (video.description = description) : null;

    const result = await this.videoRepository.save(video);
    return {
      result: 'ok',
      status: 200,
      message: 'success',
      data: result,
    };
  }

  public async existsMwc(payload: ExistsMwcRequest): Promise<ExistsMwcResponse> {
    const { userEmail, fileName } = payload;
    const QueryBuilder = this.videoRepository.createQueryBuilder('video');
    const video = QueryBuilder.where('video.email = :userEmail', { userEmail }).andWhere(
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

    const existsDir = fs.existsSync(`${process.env.MWC_FILE_ROOT}/${userId}`);
    if (!existsDir) {
      await fsp.mkdir(`${process.env.MWC_FILE_ROOT}/${userId}`);
    }

    const duration: number = await this.getDuration(fileName);
    const video = new Video();

    video.email = user.email;
    video.title = 'MWC Event';
    video.subTitle = 'MWC Event';
    video.description = 'MWC Event';
    video.ownerName = user.name;
    video.ownerNickName = user.nickname;
    video.ownerChannelName = user.nickname;
    video.ownerProfileIconUrl = 'http://cdn.4dist.com/4dist/default/defaultProfile.png';
    video.thumbnailUrl = `http://cdn.4dist.com/${user.email}/${fileName.split('.')[0]}.png`;
    video.duration = (duration * 1000).toString() || '0';
    video.category = Category.ENTERTAINMENTS;
    video.categorySub = CategorySubEnum.MWC;
    video.categorySubCode = CategorySubCodeEnum.MWC;
    video.recordType = RecordType.SHORTS;
    video.contentUrlList = [`http://cdn.4dist.com/${user.email}/${fileName}`];
    video.poseIndicatorList = [];
    video.nodeId = 'MWC0001001001';

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
      FfmpegCommand.ffprobe(`${process.env.MWC_FILE_PATH}/${this.getDates()}/${fileName}`, (err, metadata) => {
        if (err) {
          reject(err);
        }
        resolve(metadata.format.duration);
      });
    });
  }

  private async moveFile(fileName: string, userEmail: string) {
    const file = fileName.split('.')[0];

    await fsp.rename(
      `${process.env.MWC_FILE_PATH}/${this.getDates()}/${fileName}`,
      `${process.env.MWC_FILE_ROOT}/${userEmail}/${fileName}`,
    );
    await fsp.rename(
      `${process.env.MWC_FILE_PATH}/${this.getDates()}/${file}.png`,
      `${process.env.MWC_FILE_ROOT}/${userEmail}/${file}.png`,
    );
  }
}
