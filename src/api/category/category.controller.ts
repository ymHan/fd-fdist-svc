import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetCategoryResponse, GetCategorySubResponse, F_DIST_SERVICE_NAME } from '@proto/fdist.pb';
import { CategoryService } from './category.service';

@Controller()
export class CategoryController {
  @Inject(CategoryService)
  private readonly service: CategoryService;

  @GrpcMethod(F_DIST_SERVICE_NAME, 'GetCategorySub')
  private getCategories(): Promise<GetCategorySubResponse> {
    return this.service.getCategories();
  }

  @GrpcMethod(F_DIST_SERVICE_NAME, 'GetCategory')
  private getCategory(): Promise<GetCategoryResponse> {
    return this.service.getCategory();
  }
}
