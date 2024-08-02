import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ReportEntity,
  VideoEntity,
  UserAccountEntity,
  VenueBackofficeEntity,
  ivod_process_entity,
  CommonCodeEntity,
} from '@/model/entities';
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
  GetReportTypeResponse,
} from '@proto/fdist.pb';
import { Category, CategorySubEnum, RecordType } from '@enum/index';
import axios from 'axios';
import * as dayjs from 'dayjs';
import { ViewVideo } from '@/model/view';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class VideoService {
  @InjectRepository(UserAccountEntity) private readonly userRepository: Repository<UserAccountEntity>;
  @InjectRepository(ReportEntity) private readonly reportRepository: Repository<ReportEntity>;
  @InjectRepository(VideoEntity) private readonly videoEntityRepository: Repository<VideoEntity>;
  @InjectRepository(ViewVideo) private readonly viewVideoRepository: Repository<ViewVideo>;
  @InjectRepository(VenueBackofficeEntity) private readonly venueRepository: Repository<VenueBackofficeEntity>;
  @InjectRepository(ivod_process_entity) private readonly ivodRepository: Repository<ivod_process_entity>;
  @InjectRepository(CommonCodeEntity) private readonly commonCodeRepository: Repository<CommonCodeEntity>;

  public async togglePublished(payload: TogglePublishedRequest): Promise<TogglePublishedResponse> {
    const { videoId } = payload;
    const video = await this.videoEntityRepository.findOne({ where: { id: videoId } });
    if (!video) {
      return {
        result: 'fail',
        status: 400,
        message: 'video not found',
        data: null,
      };
    }
    video.isPublic = !video.isPublic;
    const result = await this.videoEntityRepository.save(video);

    return {
      result: 'ok',
      status: 200,
      message: 'success',
      data: {
        isPublished: result.isPublic,
      },
    };
  }

  public async deleteVideo(payload: DeleteVideoRequest): Promise<any> {
    const { videoId } = payload;
    const video = await this.videoEntityRepository.findOne({ where: { id: videoId, isDeleted: false } });

    if (!video) {
      return {
        result: 'fail',
        status: 400,
        message: 'video not found',
        data: null,
      };
    }

    video.isDeleted = true;
    await this.videoEntityRepository.save(video);

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
      .where(`video.email = '${userEmail}'`)
      .andWhere(`video.isDeleted = false`)
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
        .where('video.recordType = :type', { type: type.toUpperCase() })
        .andWhere('video.isPublic = :isPublished', { isPublished: true })
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

  //전체 영상을 뿌리는 역할을 한다.
  public async getVideos(payload: GetVideoListRequest): Promise<any> {
    const cat = payload.cat.toUpperCase() || 'all';
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
      const queryBuilder = this.viewVideoRepository.createQueryBuilder('vv');
      const [videos, total] = await queryBuilder
        .where('vv.isPublic = :isPublished', { isPublished: true })
        .andWhere('vv.isDeleted = :isDeleted', { isDeleted: false })
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
      const queryBuilder = this.viewVideoRepository.createQueryBuilder('vv');
      const [videos, total] = await queryBuilder
        .where('vv.category = :cat', { cat: cat.toUpperCase() })
        .andWhere('vv.isPublic = :isPublished', { isPublished: true })
        .andWhere('vv.isDeleted = :isDeleted', { isDeleted: false })
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
      const queryBuilder = this.viewVideoRepository.createQueryBuilder('vv');
      const [videos, total] = await queryBuilder
        .where('vv.categorySub = :cat', { cat: cat.toUpperCase() })
        .andWhere('vv.isPublic = :isPublished', { isPublished: true })
        .andWhere('vv.isDeleted = :isDeleted', { isDeleted: false })
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
      const queryBuilder = this.viewVideoRepository.createQueryBuilder('vv');
      const [videos, total] = await queryBuilder
        .where('vv.recordType = :cat', { cat })
        .andWhere('vv.isPublic = :isPublished', { isPublished: true })
        .andWhere('vv.isDeleted = :isDeleted', { isDeleted: false })
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
    const video = await this.videoEntityRepository.findOne({ where: { id: payload.id } });

    if (!video) {
      return {
        result: 'fail',
        status: 404,
        message: 'not found',
      };
    }

    video.view_count += 1;
    await this.videoEntityRepository.save(video);

    return {
      result: 'ok',
      status: 200,
      message: 'success',
      data: video,
    };
  }

  async getReportVideoType(): Promise<GetReportTypeResponse> {
    const checkReportType = await this.commonCodeRepository.find({
      where: { groupCode: 'RPKD' },
      select: ['code', 'name', 'isDeleted'],
    });

    return {
      result: 'ok',
      status: 200,
      message: 'success',
      data: checkReportType,
    };
  }

  async reportVideo(payload: ReportVideoRequest): Promise<ReportVideoResponse> {
    const reportsType = payload.reportType;

    if (!reportsType) {
      return {
        result: 'fail',
        status: 404,
        message: 'fail',
        data: [
          {
            result: false,
          },
        ],
      };
    }

    const checkExists = await this.commonCodeRepository.findOne({
      where: { groupCode: 'RPKD', code: String(reportsType) },
    });

    if (!checkExists) {
      return {
        result: 'fail',
        status: 404,
        message: 'fail',
        data: [
          {
            result: false,
          },
        ],
      };
    }

    const report = new ReportEntity();
    report.userId = payload.userId;
    report.videoId = payload.videoId;
    report.commoncode = checkExists;
    await this.reportRepository.save(report);

    const video = await this.videoEntityRepository.findOne({ where: { id: payload.videoId } });
    video.reportCount += 1;
    await this.videoEntityRepository.save(video);

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

  //category 분류한다.
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

  async videoDone(payload: any): Promise<any> {
    const { tempId, recordType, duration, thumbnail } = payload;
    const video = await this.videoEntityRepository.findOne({
      where: { tempId, recordType: recordType.toUpperCase() },
      relations: ['user'],
    });
    video.duration = duration;
    video.thumbnail = thumbnail;
    recordType === RecordType.SHORTSX.toLowerCase() ? (video.isStatus = false) : (video.isStatus = true);

    const res = await this.videoEntityRepository.save(video);

    if (RecordType.SHORTSX.toLowerCase() === recordType) {
      //video.channelList = await this.getMetaInfo(res); // 카메라 채널 수를 가져온다.
      //const ivp_result: any = await this.makeIVP(res, res.channelList.length, `${process.env.IVP_PATH_OLD}`);

      //console.log('ivp_result', ivp_result);
      res.isStatus = true;
      await this.videoEntityRepository.save(res);
    }

    return {
      videoId: res.id,
      userId: res.user.id,
      tempId: res.tempId,
      recordType: video.recordType,
    };
  }

  async videoMake(payload: any): Promise<any> {
    const { tempId, recordType } = payload;
    const video = await this.videoEntityRepository.findOne({
      where: { tempId, recordType: recordType.toUpperCase() },
      relations: ['user'],
    });

    video.title = await this.makeTitles(video.nodeId, recordType);
    video.sub_title = await this.makeTitles(video.nodeId, recordType);
    video.description = await this.makeTitles(video.nodeId, recordType);
    video.file_path = this.makeFilePath(video.user.email);
    video.video_files = await this.makeContents(tempId, recordType);
    video.meta = await this.makeMeta(tempId, recordType);
    video.url = await this.getUrl(video.nodeId);
    video.thumbnail = await this.makeThumbnail(tempId, recordType);

    await this.videoEntityRepository.save(video);

    return {
      videoId: video.id,
      userId: video.user.id,
      tempId: video.tempId,
      recordType: video.recordType,
    };
  }

  async makeContents(tempId: string, recordType: string): Promise<Array<string>> {
    switch (recordType) {
      case RecordType.ASSISTS.toLowerCase(): {
        return [`${recordType}_center_${tempId}.mp4`, `${recordType}_left_${tempId}.mp4`, `${recordType}_right_${tempId}.mp4`];
      }
      case RecordType.SHORTS.toLowerCase(): {
        return [`shorts_${tempId}.mp4`];
      }
      case RecordType.SHORTSX.toLowerCase(): {
        return [`shortsx_${tempId}.mp4`];
      }
    }
  }

  async makeThumbnail(tempId: string, recordType: string): Promise<Array<string>> {
    switch (recordType) {
      case RecordType.ASSISTS.toLowerCase(): {
        return [`${recordType}_center_${tempId}.jpg`, `${recordType}_left_${tempId}.jpg`, `${recordType}_right_${tempId}.jpg`];
      }
      case RecordType.SHORTS.toLowerCase(): {
        return [`shorts_${tempId}.jpg`];
      }
      case RecordType.SHORTSX.toLowerCase(): {
        return [`shortsx_${tempId}.jpg`];
      }
    }
  }

  async getUrl(nodeId: string) {
    const venueId = nodeId.substring(10, 13);
    const venue = await this.venueRepository.findOne({ where: { id: venueId } });

    return venue.url;
  }

  async makeMeta(tempId: string, recordType: string): Promise<Array<string>> {
    switch (recordType) {
      case RecordType.ASSISTS.toLowerCase(): {
        return [`${recordType}_center_${tempId}.json`, `${recordType}_left_${tempId}.json`, `${recordType}_right_${tempId}.json`];
      }
      case RecordType.SHORTS.toLowerCase(): {
        return [];
      }
      case RecordType.SHORTSX.toLowerCase(): {
        return [];
      }
    }
  }

  makeFilePath(userEmail: string): string {
    const Dates = dayjs(new Date()).format('YYYYMMDD');
    return `/${userEmail}/${Dates}/video/`;
  }

  async makeTitles(nodeId: any, recordType: string): Promise<string> {
    const venueId = nodeId.substring(10, 13);
    const venue = await this.venueRepository.findOne({ where: { id: venueId } });
    return `${venue.name} - ${recordType}`;
  }

  async getMetaInfo(video) {
    const channelFilePath = `${process.env.ORIGIN_FILE_ROOT}${video.file_path.replace('video', 'json')}shortsx_${
      video.tempId
    }.json`;

    const channel = JSON.parse(fs.readFileSync(channelFilePath, 'utf8'));
    return channel.param.channel_list;
  }

  async makeIVP(video, arrLength: number, IVP_PATH: string) {
    const src_file_path = `oss://kr-4d-4dist${video.file_path}`;

    const req_data = {
      command: 'start',
      data: {
        source_url: `${src_file_path}${video.video_files[0]}`,
        system_id: '0001A',
        codec_preset: {
          input: {
            vcodec: 'H.264',
            channel_count: arrLength,
            path: '',
          },
          adaptive: [
            {
              vcodec: 'H.264',
              width: 1920,
              fps: 29.97,
              gop: 30,
              bitrate: 2000,
              height: 1080,
            },
            {
              vcodec: 'H.264',
              width: 1280,
              fps: 29.97,
              gop: 30,
              bitrate: 1000,
              height: 720,
            },
            {
              vcodec: 'H.264',
              width: 854,
              fps: 29.97,
              gop: 30,
              bitrate: 350,
              height: 480,
            },
            {
              vcodec: 'H.264',
              width: 1920,
              fps: 29.97,
              gop: 1,
              bitrate: 12000,
              height: 1080,
            },
            {
              vcodec: 'H.264',
              width: 1280,
              fps: 29.97,
              gop: 1,
              bitrate: 6000,
              height: 720,
            },
            {
              vcodec: 'H.264',
              width: 854,
              fps: 29.97,
              gop: 1,
              bitrate: 2100,
              height: 480,
            },
          ],
        },
        deploy_info: {
          deploy: 'oss',
          oss: {
            endpoint_url: 'oss-ap-northeast-2.aliyuncs.com',
            bucket: 'kr-4d-4dist',
          },
        },
        event_id: '0001A0001',
        destination_prefix: `${video.file_path.replace('video', 'ivod').replace('/', '')}${video.id}`,
        return_api: `https://api.4dist.com/v1/video/ivp/${video.id}`,
      },
    };
    const ivp_msg = await this.axios_notify(`${IVP_PATH}/post`, req_data);
    const iVodProcess = new ivod_process_entity();
    iVodProcess.filename = video.video_files[0];
    iVodProcess.filepath = req_data.data.destination_prefix.substring(1, req_data.data.destination_prefix.length);
    iVodProcess.returnapi = req_data.data.return_api;
    await this.ivodRepository.save(iVodProcess);

    return ivp_msg;
  }

  private axios_notify(url: string, data: any) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public async ivpVideo(payload) {
    const video = await this.videoEntityRepository.findOne({
      where: { id: payload.id },
      relations: ['user'],
    });

    const url = video.url;
    const path = video.file_path.replace('video', 'ivod');
    let chLen = Math.round(video.channelList.length / 2).toString();
    switch (chLen.length) {
      case 1:
        chLen = '00' + chLen;
        break;
      case 2:
        chLen = '0' + chLen;
        break;
    }

    const hls_url = `${url}${path}${video.id}/${chLen}/master.m3u8`;
    video.isStatus = true;
    video.video_files = [`${hls_url}`];

    await this.videoEntityRepository.save(video);

    const sendData = {
      userId: video.user.id,
      data: {
        video: video.recordType,
      },
    };
    const pushResult: any = await this.axios_instance(`http://noti.4dist.com/push`, sendData);
    console.log(pushResult);
    return pushResult;
  }

  private axios_instance(url: string, data: any) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
