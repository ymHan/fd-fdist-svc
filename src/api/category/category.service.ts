import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video, SubCategory, VideoEntity, CommonCode, ItemDetails } from '@entities/index';
import { GetCategorySubResponse, GetCategoryResponse, GetRecordTypeResponse } from '@proto/fdist.pb';

@Injectable()
export class CategoryService {
  @InjectRepository(Video)        private readonly videoRepository: Repository<Video>;
  @InjectRepository(SubCategory)  private readonly subCategoryRepository: Repository<SubCategory>;
  @InjectRepository(VideoEntity)  private readonly videoEntityRepository: Repository<VideoEntity>;
  @InjectRepository(CommonCode)   private readonly commonCodeRepository: Repository<CommonCode>;
  @InjectRepository(ItemDetails)  private readonly itemRepository: Repository<ItemDetails>;

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

  public async getCategories(payload: any): Promise<GetCategorySubResponse> {
    let lang = payload.lang;
    if (lang === '' || lang === undefined) {
      lang = 'en';
    }

    let num = 1;
    const categories = await this.itemRepository.createQueryBuilder('item_details')
      .select(`sort, ${lang}`)
      .orderBy('sort', 'ASC')
      .getRawMany();
    let data1 = [];
    data1[0] = {
      index: 0,
      categorySubName: 'All',
    };
    data1[1] = {
      index: 100,
      categorySubName: 'My Video',
    }
    const data2 = categories.map((category) => {
      return {
        index: num++,
        categorySubName: category[`${lang}`],
      };
    });

    const data = data1.concat(data2);

    return {
      result: 'ok',
      status: 200,
      message: 'success',
      data,
    };
  }

  public async getRecordType(): Promise<GetRecordTypeResponse> {
    const data = [
      {
        index: 0,
        recordType: 'ASSISTS',
      },
      {
        index: 1,
        recordType: 'SHORTS',
      },
      {
        index: 2,
        recordType: 'SHORTS+',
      },
    ];

    return {
      result: 'ok',
      status: 200,
      message: 'success',
      data,
    };
  }
}
