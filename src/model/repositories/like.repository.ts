import { Repository } from 'typeorm';
import { CustomRepository } from '@config/typeorm/typeorm-ex.decorator';
import { Like } from '@entities/index';

@CustomRepository(Like)
export class LikeRepository extends Repository<Like> {}
