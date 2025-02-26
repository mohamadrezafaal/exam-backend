import {InjectRepository} from '@nestjs/typeorm';
import {OrganProperty} from '@/entities/organ-property.entity';
import {Repository} from 'typeorm';
import '@/common/typeorm/select-query-builder-extentions';

export class OrganPropertyRepository extends Repository<OrganProperty> {
    constructor(
        @InjectRepository(OrganProperty)
        private readonly repository: Repository<OrganProperty>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    findByOrganId(organId: number, pageLimit: number, page: number) {
        const query = this.repository
            .createQueryBuilder('organproperty')
            .leftJoin('organproperty.geographicalPlace', 'geographicalPlace')
            .leftJoin('organproperty.organ', 'organ')
            .innerJoin('organproperty.deprivationDegree', 'deprivationDegree')
            .innerJoin('organproperty.badWeatherDegree', 'badWeatherDegree')
            .innerJoin('organproperty.areaType', 'areaType')
            .select([
                'organproperty.id',
                'organproperty.organId',
                'organproperty.changeDate',
                // 'organproperty.geographicalPlaceId',
                // 'organproperty.deprivationDegreeId',
                // 'organproperty.badWeatherDegreeId',
                // 'organproperty.areaTypeId',
                'organproperty.badWeatherDegreeId',
                'geographicalPlace.id',
                'geographicalPlace.title',
                'geographicalPlace.typeId',
                'geographicalPlace.itemCode',
                'geographicalPlace.baseCode',
                'geographicalPlace.levelNumber',
                'geographicalPlace.deActiveDate',
                'deprivationDegree.id',
                'deprivationDegree.name',
                'badWeatherDegree.id',
                'badWeatherDegree.name',
                'areaType.id',
                'areaType.name',
                'organ.id',
                'organ.title',
            ])
            .where('organproperty.organId = :organId', {organId: organId});
        query.addPagination(pageLimit, page)

        return query.getManyAndCount();
    }
}

