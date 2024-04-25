import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MwcController } from './mwc.controller';
import { MwcService } from './mwc.service';
import { Video, User, VideoEntity, UserAccountEntity } from '@entities/index';

@Module({
  imports: [TypeOrmModule.forFeature([Video, User, VideoEntity, UserAccountEntity])],
  controllers: [MwcController],
  providers: [MwcService],
})
export class MwcModule {}
