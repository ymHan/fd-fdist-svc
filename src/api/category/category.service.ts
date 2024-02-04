import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '@entities/index';
import { CategorySubEnum } from '@root/model/enum';
import { GetCategorySubResponse } from '@proto/fdist.pb';

@Injectable()
export class CategoryService {
  @InjectRepository(Video)
  private readonly videoRepository: Repository<Video>;
  public async getCategories(): Promise<GetCategorySubResponse> {
    const categories = await this.videoRepository
      .createQueryBuilder('video')
      .select('DISTINCT video.categorySub', 'categorySub')
      .orderBy('video.categorySub', 'ASC')
      .getRawMany();

    let num = 1;
    const data = categories.map((category) => {
      return {
        index: num++,
        categorySubName: CategorySubEnum[category.categorySub],
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
}
