import { Repository } from 'typeorm';
import { CustomRepository } from '@config/typeorm/typeorm-ex.decorator';
import { LikeEntity } from '@/model/entities';

@CustomRepository(LikeEntity)
export class LikeRepository extends Repository<LikeEntity> {}
