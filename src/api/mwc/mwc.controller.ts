import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MwcService } from './mwc.service';
import {
  MWC_SERVICE_NAME,
  AddMwcRequest,
  UpdateVideoMetaInfoRequest,
  UpdateVideoMetaInfoResponse,
  ExistsMwcResponse,
  ExistsMwcRequest,
} from '@proto/fdist.pb';

@Controller()
export class MwcController {
  @Inject(MwcService)
  private readonly service: MwcService;

  @GrpcMethod(MWC_SERVICE_NAME, 'addMwc')
  private addMwc(payload: AddMwcRequest): Promise<any> {
    return this.service.addMwc(payload);
  }

  @GrpcMethod(MWC_SERVICE_NAME, 'existsMwc')
  private existsMwc(payload: ExistsMwcRequest): Promise<ExistsMwcResponse> {
    return this.service.existsMwc(payload);
  }

  @GrpcMethod(MWC_SERVICE_NAME, 'updateVideoMetaInfo')
  private updateVideoMetaInfo(payload: UpdateVideoMetaInfoRequest): Promise<UpdateVideoMetaInfoResponse> {
    return this.service.updateVideoMetaInfo(payload);
  }
}
