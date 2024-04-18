import { Repository } from 'typeorm';
import { CustomRepository } from '@config/typeorm/typeorm-ex.decorator';
import { VideoEntity } from '@entities/index';

@CustomRepository(VideoEntity)
export class VideoEntityRepository extends Repository<VideoEntity> {}
