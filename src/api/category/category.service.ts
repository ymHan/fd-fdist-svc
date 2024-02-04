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
      .getRawMany();

    const data = categories.map((category) => {
      return {
        category: category.categorySub,
        categorySubName: CategorySubEnum[category.categorySub],
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
