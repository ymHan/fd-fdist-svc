import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MwcEventController } from './mwc-event.controller';
import { MwcEventService } from './mwc-event.service';
import { Video, User } from '@entities/index';

@Module({
  imports: [TypeOrmModule.forFeature([Video, User])],
  controllers: [MwcEventController],
  providers: [MwcEventService],
})
export class MwcEventModule {}