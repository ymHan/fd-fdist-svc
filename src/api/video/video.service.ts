import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '@entities/index';
import { ReportEntity } from '@entities/report.entity';
import {
  GetVideoByIdRequest,
  GetVideoListRequest,
  ReportVideoRequest,
  ReportVideoResponse,
  GetVideoRecordTypeRequest,
  MyVideoListRequest,
  MyVideoExistsRequest,
  MyVideoExistsResponse,
  DeleteVideoRequest,
  TogglePublishedRequest,
  TogglePublishedResponse,
} from '@proto/fdist.pb';
import { Category, CategorySubEnum, RecordType } from '@enum/index';

@Injectable()
export class VideoService {
  @InjectRepository(Video)
  private readonly videoRepository: Repository<Video>;

  @InjectRepository(ReportEntity)
  private readonly reportRepository: Repository<ReportEntity>;

  public async togglePublished(payload: TogglePublishedRequest): Promise<TogglePublishedResponse> {
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
      data: {
        isPublished: result.isPublished,
      },
    };
  }

  public async deleteVideo(payload: DeleteVideoRequest): Promise<any> {
    const { userId, videoId } = payload;
    const video = await this.videoRepository.findOne({ where: { email: userId, id: videoId, isDeleted: false } });
    console.log(video);
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

  public async myVideoExists(payload: MyVideoExistsRequest): Promise<MyVideoExistsResponse> {
    const userEmail = payload.userEmail;

    const video = await this.videoRepository.findOne({ where: { email: userEmail } });
    if (!video) {
      return {
        result: 'fail',
        status: 200,
        message: 'My video not exists',
      };
    } else {
      return {
        result: 'ok',
        status: 200,
        message: 'My video file is exists',
      };
    }
  }

  public async myVideoList(payload: MyVideoListRequest): Promise<any> {
    const userEmail = payload.userEmail;
    const page = payload.page || 1;
    const limit = payload.limit || 10;
    const sort = payload.sort || 'createdAt';
    const order = payload.order || 'desc';

    const queryBuilder = this.videoRepository.createQueryBuilder('video');
    const [videos, total] = await queryBuilder
      .where('video.email = :userEmail', { userEmail })
      .andWhere('video.isDeleted = :isDeleted', { isDeleted: false })
      .skip((page - 1) * limit)
      .orderBy(`video.${sort}`, order.toUpperCase() as 'ASC' | 'DESC')
      .take(limit)
      .getManyAndCount();

    return {
      result: 'ok',
      status: 200,
      message: 'success',
      data: videos,
      meta: {
        page,
        limit,
        totalCount: total,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  public async getVideoRecordType(payload: GetVideoRecordTypeRequest): Promise<any> {
    const type = payload.type;
    const page = payload.page || 1;
    const limit = payload.limit || 10;

    if (!type) {
      const queryBuilder = this.videoRepository.createQueryBuilder('video');
      const [videos, total] = await queryBuilder
        .where('video.recordType = :type', { type })
        .andWhere('video.isPublished = :isPublished', { isPublished: true })
        .getManyAndCount();

      return {
        result: 'ok',
        status: 200,
        message: 'success',
        data: videos,
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / limit),
        },
      };
    } else {
      const queryBuilder = this.videoRepository.createQueryBuilder('video');
      const [videos, total] = await queryBuilder
        .where('video.recordType = :type', { type })
        .andWhere('video.isPublished = :isPublished', { isPublished: true })
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      return {
        result: 'ok',
        status: 200,
        message: 'success',
        data: videos,
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / limit),
        },
      };
    }
  }

  public async getVideos(payload: GetVideoListRequest): Promise<any> {
    const cat = payload.cat || 'all';
    const page = payload.page || 1;
    const limit = payload.limit || 10;

    let checkMain = false;
    let checkSub = false;
    let checkRecordType = false;

    const keys = Object.keys(CategorySubEnum);
    const keys2 = Object.keys(Category);
    const keys3 = Object.keys(RecordType);

    keys.forEach((key) => {
      if (cat === key) {
        checkSub = true;
      }
    });
    keys2.forEach((key) => {
      if (cat === key) {
        checkMain = true;
      }
    });
    keys3.forEach((key) => {
      if (cat === key) {
        checkRecordType = true;
      }
    });

    if (!checkMain && !checkSub && !checkRecordType) {
      //const [videos, total] = await this.videoRepository.findAndCount();
      const queryBuilder = this.videoRepository.createQueryBuilder('video');
      const [videos, total] = await queryBuilder
        .where('video.isPublished = :isPublished', { isPublished: true })
        .andWhere('video.isDeleted = :isDeleted', { isDeleted: false })
        .getManyAndCount();

      return {
        result: 'ok',
        status: 200,
        message: 'success',
        data: videos,
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / limit),
        },
      };
    }

    if (checkMain) {
      const queryBuilder = this.videoRepository.createQueryBuilder('video');
      const [videos, total] = await queryBuilder
        .where('video.category = :cat', { cat })
        .andWhere('video.isPublished = :isPublished', { isPublished: true })
        .andWhere('video.isDeleted = :isDeleted', { isDeleted: false })
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      return {
        result: 'ok',
        status: 200,
        message: 'success',
        data: videos,
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / limit),
        },
      };
    }

    if (checkSub) {
      const queryBuilder = this.videoRepository.createQueryBuilder('video');
      const [videos, total] = await queryBuilder
        .where('video.categorySub = :cat', { cat })
        .andWhere('video.isPublished = :isPublished', { isPublished: true })
        .andWhere('video.isDeleted = :isDeleted', { isDeleted: false })
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      return {
        result: 'ok',
        status: 200,
        message: 'success',
        data: videos,
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / limit),
        },
      };
    }

    if (checkRecordType) {
      const queryBuilder = this.videoRepository.createQueryBuilder('video');
      const [videos, total] = await queryBuilder
        .where('video.recordType = :cat', { cat })
        .andWhere('video.isPublished = :isPublished', { isPublished: true })
        .andWhere('video.isDeleted = :isDeleted', { isDeleted: false })
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();

      return {
        result: 'ok',
        status: 200,
        message: 'success',
        data: videos,
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / limit),
        },
      };
    }
  }
  async getVideoById(payload: GetVideoByIdRequest): Promise<any> {
    const video = await this.videoRepository.findOne({ where: { id: payload.id } });
    video.viewCount += 1;
    await this.videoRepository.save(video);

    if (!video) {
      return {
        result: 'fail',
        status: 404,
        message: 'not found',
      };
    }

    return {
      result: 'ok',
      status: 200,
      message: 'success',
      data: video,
    };
  }

  async reportVideo(payload: ReportVideoRequest): Promise<ReportVideoResponse> {
    const report = new ReportEntity();
    report.userId = payload.userId;
    report.videoId = payload.videoId;
    report.reportType = payload.reportType;
    report.report = payload.report;

    await this.reportRepository.save(report);

    const video = await this.videoRepository.findOne({ where: { id: payload.videoId } });
    video.reportCount += 1;
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
