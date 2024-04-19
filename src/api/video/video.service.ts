import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportEntity, Video, VideoEntity, UserAccountEntity, VenueBackofficeEntity } from '@/model/entities';
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
  addTmpVideoRequest,
} from '@proto/fdist.pb';
import { Category, CategorySubEnum, RecordType } from '@enum/index';
import * as dayjs from 'dayjs';
import { ViewVideo } from '@/model/view';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class VideoService {
  @InjectRepository(UserAccountEntity) private readonly userRepository: Repository<UserAccountEntity>;
  @InjectRepository(Video) private readonly videoRepository: Repository<Video>;
  @InjectRepository(ReportEntity) private readonly reportRepository: Repository<ReportEntity>;
  @InjectRepository(VideoEntity) private readonly videoEntityRepository: Repository<VideoEntity>;
  @InjectRepository(ViewVideo) private readonly viewVideoRepository: Repository<ViewVideo>;
  @InjectRepository(VenueBackofficeEntity) private readonly venueRepository: Repository<VenueBackofficeEntity>;

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
    const QueryBuilder = this.viewVideoRepository.createQueryBuilder('video');
    const video = QueryBuilder.where('video.email = :userEmail', { userEmail })
      .andWhere('video.isDeleted = :isDeleted', { isDeleted: false })
      .getOne();

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

    const queryBuilder = this.viewVideoRepository.createQueryBuilder('video');

    const [videos, total] = await queryBuilder
      .where('video.email = :userEmail', { userEmail })
      .andWhere('video.isDeleted = :isDeleted', { isDeleted: false })
      .andWhere('video.isStatus = :isStatus', { isStatus: true })
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
      const queryBuilder = this.viewVideoRepository.createQueryBuilder('video');
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
      const queryBuilder = this.viewVideoRepository.createQueryBuilder('video');
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

    if (!video) {
      return {
        result: 'fail',
        status: 404,
        message: 'not found',
      };
    }

    video.viewCount += 1;
    await this.videoRepository.save(video);

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

  //category를 분류한다.
  getCategory(str: string): string {
    const cat = str.substring(0, 1);
    let category: string;
    switch (cat) {
      case 'S':
        category = 'SPORTS';
        break;
      case 'E':
        category = 'ENTERTAINMENTS';
        break;
      case 'P':
        category = 'PROMOTION';
        break;
    }
    return category;
  }

  //임시로 영상 정보를 입력한다.
  public async addTmpVideo(payload: addTmpVideoRequest): Promise<any> {
    const { tempId, nodeId, ownerEmail } = payload;
    const user = await this.userRepository.findOne({ where: { email: ownerEmail } });
    const id = parseInt(nodeId.substring(5, 6), 10);
    const subCode = nodeId.substring(0, 5);
    const newVideo = {
      tempId,
      nodeId,
      category: this.getCategory(subCode),
      categorySub: subCode,
      categorySubCode: subCode,
      user,
      recordType: null,
    };

    const result = await this.addTempVideo(id, newVideo);

    return {
      result: 'ok',
      status: 200,
      message: 'success',
      data: result,
    };
  }

  private async addTempVideo(item: number, newVideo: any) {
    let result;
    switch (item) {
      case 7:
        for (const recordType of Object.values(RecordType)) {
          if (recordType !== RecordType.CASTS) {
            newVideo.recordType = recordType;
            result = await this.videoEntityRepository.insert(newVideo);
          }
        }
        break;
      case 6:
        for (const recordType of Object.values(RecordType)) {
          if (recordType !== RecordType.ASSISTS) {
            if (recordType !== RecordType.CASTS) {
              newVideo.recordType = recordType;
              result = await this.videoEntityRepository.insert(newVideo);
            }
          }
        }
        break;
      case 5:
        for (const recordType of Object.values(RecordType)) {
          if (recordType !== RecordType.SHORTS) {
            if (recordType !== RecordType.CASTS) {
              newVideo.recordType = recordType;
              result = await this.videoEntityRepository.insert(newVideo);
            }
          }
        }
        break;
      case 4:
        for (const recordType of Object.values(RecordType)) {
          if (recordType !== RecordType.SHORTSX) {
            if (recordType !== RecordType.CASTS) {
              newVideo.recordType = recordType;
              result = await this.videoEntityRepository.insert(newVideo);
            }
          }
        }
        break;
      case 3:
        newVideo.recordType = RecordType.SHORTSX;
        result = await this.videoEntityRepository.insert(newVideo);
        break;
      case 2:
        newVideo.recordType = RecordType.SHORTS;
        result = await this.videoEntityRepository.insert(newVideo);
        break;
      case 1:
        newVideo.recordType = RecordType.ASSISTS;
        result = await this.videoEntityRepository.insert(newVideo);
        break;
    }

    return { result };
  }

  async videoUpload(payload: any): Promise<any> {
    const { tempId, recordType, contents } = payload;
    const video = await this.videoEntityRepository.findOne({
      where: { tempId, recordType: recordType.toUpperCase() },
      relations: ['user'],
    });

    video.title = await this.makeTitles(video.nodeId);
    video.sub_title = await this.makeTitles(video.nodeId);
    video.description = await this.makeTitles(video.nodeId);
    video.isStatus = true;
    video.file_path = this.makeFilePath(video.user.email);
    video.video_files = contents;
    video.meta = await this.makeMeta(contents, recordType);
    video.url = await this.getUrl(video.nodeId);

    await this.getMetaInfo(video);

    video.duration = this.makeDuration(contents);
    video.thumbnail = this.makeThumbnail(contents, recordType);

    await this.videoEntityRepository.save(video);

    return {
      videoId: video.id,
      userId: video.user.id,
      tempId: video.tempId,
      recordType: video.recordType,
    };
  }

  async getUrl(nodeId: string) {
    const venueId = nodeId.substring(10, 13);
    const venue = await this.venueRepository.findOne({ where: { id: venueId } });

    return venue.url;
  }

  async makeMeta(contents: Array<string>, recordType: string): Promise<Array<string>> {
    const meta = [];
    if (recordType === RecordType.ASSISTS.toLowerCase()) {
      for (const content of contents) {
        meta.push(content.replace('mp4', 'json'));
      }
    }
    return meta;
  }

  makeFilePath(userEmail: string): string {
    const Dates = dayjs(new Date()).format('YYYYMMDD');
    return `/${userEmail}/${Dates}/video/`;
  }

  makeThumbnail(contents: Array<string>, recordType: string): Array<string> {
    const thumbnail = [];
    if (recordType === RecordType.ASSISTS.toLowerCase()) {
      for (const content of contents) {
        thumbnail.push(content.replace('mp4', 'jpg'));
      }
    }
    return thumbnail;
  }

  makeDuration(contents: Array<string>): string {
    return 'duration';
  }

  async makeTitles(nodeId: string): Promise<string> {
    const venueId = nodeId.substring(10, 13);
    const venue = await this.venueRepository.findOne({ where: { id: venueId } });
    return venue.name;
  }

  async getMetaInfo(video) {
    const metaFilePath = `${process.env.ORIGIN_FILE_ROOT}${video.file_path}meta.json`;
    const payload = {
      tempId: video.tempId,
      recordType: video.recordType,
      metaFilePath,
    };
    await this.getFileInfo(payload);
  }

  async getFileInfo(payload) {
    const { tempId, recordType, metaFilePath } = payload;
    try {
      const meta = JSON.parse(fs.readFileSync(metaFilePath, 'utf8'));

      switch (recordType) {
        case RecordType.ASSISTS:
          let tmpMeta;
          let metaInfo = {
            duration: '',
            thumbnail: [],
          }
          metaInfo.thumbnail.push(`${recordType.toLowerCase()}_left_${tempId}.jpg`);
          metaInfo.thumbnail.push(`${recordType.toLowerCase()}_center_${tempId}.jpg`);
          metaInfo.thumbnail.push(`${recordType.toLowerCase()}_right_${tempId}.jpg`);
          console.log(meta)
          console.log(metaInfo.thumbnail[0]);
          tmpMeta = this.searchMeta(metaInfo.thumbnail[0], meta);
          console.log(tmpMeta);
          metaInfo.duration = tmpMeta.duration;

          break;
        case RecordType.SHORTS:
          metaInfo.thumbnail.push(`${recordType.toLowerCase()}_${tempId}.jpg`);
          tmpMeta = await this.searchMeta(metaInfo.thumbnail[0], meta);
          metaInfo.duration = tmpMeta.duration;
          break;
        case RecordType.SHORTSX:
          metaInfo.thumbnail.push(`shortsx_${tempId}.jpg`);
          tmpMeta = await this.searchMeta(metaInfo.thumbnail[0], meta);
          metaInfo.duration = tmpMeta.duration;
          break;
      }
      const schAssists1 = `${recordType.toLowerCase()}_left_${tempId}.jpg`;
      const schAssists2 = `${recordType.toLowerCase()}_center_${tempId}.jpg`;
      const schAssists3 = `${recordType.toLowerCase()}_right_${tempId}.jpg`;
      const schShorts = `${recordType.toLowerCase()}_${tempId}.jpg`;
      const schShortsx = `${recordType.toLowerCase()}_${tempId}.jpg`;

      console.log(schAssists1, schAssists2, schAssists3, schShorts, schShortsx);

      const video = await this.videoEntityRepository.findOne({ where: { tempId, recordType } });
      video.duration = meta.duration;
      video.thumbnail = meta.thumbnail;
      video.isStatus = true;

      return await this.videoEntityRepository.save(video);
    } catch (error) {
      console.log(error);
    }
  }

  searchMeta(key, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name === key) {
        return arr[i];
      }
    }
  }
}
