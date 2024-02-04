import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Video } from '@entities/index';
import { GetCategorySubResponse } from '@proto/fdist.pb';

@Injectable()
export class CategoryService {
  @InjectRepository(Video)
  private readonly videoRepository: Repository<Video>;

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
}
