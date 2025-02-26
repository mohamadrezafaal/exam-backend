import {TreeRepository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import '../../common/typeorm/select-query-builder-extentions';
import {GeographicalPlace} from '../../entities/geographical-place.entity';

export class GeographicalPlaceRepository extends TreeRepository<GeographicalPlace> {
    constructor(
        @InjectRepository(GeographicalPlace)
        private readonly repository: TreeRepository<GeographicalPlace>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }
}