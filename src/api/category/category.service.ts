import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '@entities/index';
import { GetCategorySubResponse, GetCategoryResponse, GetRecordTypeResponse } from '@proto/fdist.pb';

@Injectable()
export class CategoryService {
  @InjectRepository(Video)
  private readonly videoRepository: Repository<Video>;

  public async getCategory(): Promise<GetCategoryResponse> {
    let num = 0;
    const categories = await this.videoRepository.createQueryBuilder('video').select('DISTINCT "category"').getRawMany();
    const data = categories.map((item) => {
      return {
        index: num++,
        category: item.category,
      };
    });

    data.sort((a, b) => a.index - b.index);

    return {
      result: 'ok',
      status: 200,
      message: 'success',
      data,
    };
  }

  public async getCategories(): Promise<GetCategorySubResponse> {
    let num = 1;
    const categories = await this.videoRepository.createQueryBuilder('video').select('DISTINCT "categorySub"').getRawMany();
    const data = categories.map((category) => {
      return {
        index: num++,
        categorySubName: category.categorySub,
      };
    });

    data.push({
      index: 0,
      categorySubName: 'ALL',
    });

    data.sort((a, b) => a.index - b.index);

    return {
      result: 'ok',
      status: 200,
      message: 'success',
      data,
    };
  }
  public async getRecordType(): Promise<GetRecordTypeResponse> {
    const recordTypes = await this.videoRepository.createQueryBuilder('video').select('DISTINCT "recordType"').getRawMany();
    let num = 0;
    const data = recordTypes.map((item) => {
      return {
        index: num++,
        recordType: item.recordType,
      };
    });

    return {
      result: 'ok',
      status: 200,
      message: 'success',
      data,
    };
  }
}
