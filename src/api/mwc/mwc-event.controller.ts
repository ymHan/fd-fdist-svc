import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { MwcEventService } from './mwc-event.service';
import { MWC_SERVICE_NAME, AddMwcRequest } from '@proto/fdist.pb';

@Controller()
export class MwcEventController {
  @Inject(MwcEventService)
  private readonly service: MwcEventService;

  @GrpcMethod(MWC_SERVICE_NAME, 'addMwc')
  private addMwc(payload: AddMwcRequest): Promise<any> {
    return this.service.addMwc(payload);
  }

  @GrpcMethod(MWC_SERVICE_NAME, 'existMwc')
  private existMwc(payload: AddMwcRequest): Promise<any> {
    return this.service.existMwc(payload);
  }
}