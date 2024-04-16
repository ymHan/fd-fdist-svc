import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MwcController } from './mwc.controller';
import { MwcService } from './mwc.service';
import { Video, User } from '@entities/index';

@Module({
  imports: [TypeOrmModule.forFeature([Video, User])],
  controllers: [MwcController],
  providers: [MwcService],
})
export class MwcModule {}
