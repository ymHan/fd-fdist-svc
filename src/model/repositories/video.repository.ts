import { Repository } from 'typeorm';
import { CustomRepository } from '@config/typeorm/typeorm-ex.decorator';
import { Video } from '@entities/index';

@CustomRepository(Video)
export class VideoRepository extends Repository<Video> {}
