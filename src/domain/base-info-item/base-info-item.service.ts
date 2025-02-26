import {Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {InjectMapper} from '@automapper/nestjs';
import {Mapper} from '@automapper/core';
import {BaseInfoItem} from '@/entities/base-info-item.entity';
import {FilterBaseInfoDto} from '../base-info/dto/filter-base-info.dto';
import {SortParam} from '@/common/dto/request-params/sort-param';
import {QueryListResultDto} from '@/common/dto/result/query-list-result.dto';
import {BaseInfoItemRepository} from './base-info-item.repository';
import {ReadBaseInfoItemDto} from './dto/read-base-info-item.dto';
import {CreateBaseInfoItemDto} from './dto/create-base-info-item.dto';
import {BaseInfoRepository} from '../base-info/base-info.repository';
import {OperationNotSuccessfulException, RequestedInfoNotFoundException,} from '@/common/utils/exception';
import {BaseTableEnum} from "@/common/enums/base-table.enum";

@Injectable()
export class BaseInfoItemService extends TypeOrmCrudService<BaseInfoItem> {
    constructor(
        private readonly repository: BaseInfoItemRepository,
        private readonly baseInfoRepository: BaseInfoRepository,
        @InjectMapper() private readonly mapper: Mapper,
    ) {
        super(repository);
    }

    async getAll(
        filterParam: FilterBaseInfoDto,
        sortParam: SortParam,
        page: number,
        pageLimit: number,
        baseInfoId: number,
    ): Promise<QueryListResultDto<ReadBaseInfoItemDto>> {
        const [data, count] = await this.repository.getAll(
            filterParam,
            sortParam,
            page,
            pageLimit,
            1,
            baseInfoId,
        );

        return {
            total: count,
            data: this.mapper.mapArray(data, BaseInfoItem, ReadBaseInfoItemDto),
        };
    }


    async getCustombaseId(
        filterParam: any,
    ): Promise<QueryListResultDto<ReadBaseInfoItemDto>> {
        const [data, count] = await this.repository.getCustombaseId(
            filterParam,
        );
        return {
            total: count,
            data: this.mapper.mapArray(data, BaseInfoItem, ReadBaseInfoItemDto),
        };
    }

    async create(data: CreateBaseInfoItemDto): Promise<ReadBaseInfoItemDto> {
        const _baseItem = await this.mapper.mapAsync(
            data,
            CreateBaseInfoItemDto,
            BaseInfoItem,
        );
        const saveResult = await this.repository.save(_baseItem);

        if (saveResult.id > 0)
            return this.mapper.map(saveResult, BaseInfoItem, ReadBaseInfoItemDto);
        else throw new OperationNotSuccessfulException();
    }

    async update(
        id: number,
        data: CreateBaseInfoItemDto,
    ): Promise<ReadBaseInfoItemDto> {
        const _baseItem = await this.repository.findOne({where: {id: id}});

        if (!_baseItem) throw new RequestedInfoNotFoundException();

        _baseItem.name = data.name;
        _baseItem.code = data.code;
        _baseItem.isActive = data.isActive;

        const saveResult = await this.repository.save(_baseItem);

        return await this.mapper.mapAsync(
            saveResult,
            BaseInfoItem,
            ReadBaseInfoItemDto,
        );
    }

    async deleteById(id: number): Promise<BaseInfoItem> {
        const _baseItem = await this.repository.findOne({where: {id: id}});
        return await this.repository.remove(_baseItem);
    }

    async isExist(id: number) {
        return this.repository.exist({where: {id: id}});
    }

    async getCitations(systemProcessId: number) {
        return this.repository.find({
            where: {
                baseInfoId: BaseTableEnum.Document,
                systemsProcessDocuments: {
                    systemProcessId: systemProcessId,
                },
            },
        });
    }
}
