import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetCategorySubResponse, F_DIST_SERVICE_NAME, GetCategoryResponse, GetRecordTypeResponse, GetCateorySubRequest } from '@proto/fdist.pb';
import { CategoryService } from './category.service';
@Controller()
export class CategoryController {
  @Inject(CategoryService)
  private readonly service: CategoryService;

  @GrpcMethod(F_DIST_SERVICE_NAME, 'GetCategorySub')
  private getCategories(payload: GetCateorySubRequest): Promise<GetCategorySubResponse> {
    return this.service.getCategories(payload);
  }

  @GrpcMethod(F_DIST_SERVICE_NAME, 'GetRecordType')
  private getRecordTypeList(): Promise<GetRecordTypeResponse> {
    return this.service.getRecordType();
  }

  @GrpcMethod(F_DIST_SERVICE_NAME, 'GetCategory')
  private getCategory(): Promise<GetCategoryResponse> {
    return this.service.getCategory();
  }
}
