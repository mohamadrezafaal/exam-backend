import {Injectable, Logger} from '@nestjs/common';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {InjectMapper} from '@automapper/nestjs';
import {Mapper} from '@automapper/core';
import {BaseInfo} from '@/entities/base-info.entity';
import {BaseInfoRepository} from './base-info.repository';
import {ReadBaseInfoDto} from './dto/read-base-info.dto';
import {SortParam} from '@/common/dto/request-params/sort-param';
import {FilterBaseInfoDto} from './dto/filter-base-info.dto';
import {QueryListResultDto} from '@/common/dto/result/query-list-result.dto';
import {CreateBaseInfoDto} from './dto/create-base-info.dto';
import {ReadBaseInfoAfterSaveDto} from './dto/read-base-info-after-save.dto';
import {OperationNotSuccessfulException, RequestedInfoNotFoundException,} from '@/common/utils/exception';

@Injectable()
export class BaseInfoService extends TypeOrmCrudService<BaseInfo> {
  constructor(
    private readonly repository: BaseInfoRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    super(repository);
  }
  async getByIdAndSystemId(
    id: number,
    systemId: number,
  ): Promise<ReadBaseInfoDto> {
    const result = this.repository
      .createQueryBuilder('baseInfo')
      .innerJoin('baseInfo.items', 'items')
      .where('baseInfo.id = :id', { id: id });

    return this.mapper.map(await result.getOne(), BaseInfo, ReadBaseInfoDto);
  }

  async getAll(
    filterParam: FilterBaseInfoDto,
    sortParam: SortParam,
    page: number,
    pageLimit: number,
  ): Promise<QueryListResultDto<ReadBaseInfoDto>> {
    const [data, count] = await this.repository.getAll(
      filterParam,
      sortParam,
      page,
      pageLimit,
      1,
    );

    return {
      total: count,
      data: this.mapper.mapArray(data, BaseInfo, ReadBaseInfoDto),
    };
  }

  async deleteById(id: number): Promise<BaseInfo> {
    const _baseInfo = await this.repository.findOne({ where: { id: id } });
    return await this.repository.remove(_baseInfo);
  }

  async create(data: CreateBaseInfoDto): Promise<ReadBaseInfoAfterSaveDto> {
    const _baseInfo = this.mapper.map(data, CreateBaseInfoDto, BaseInfo);
    const saveResult = await this.repository.save(_baseInfo);
    if (saveResult.id > 0)
      return this.mapper.map(saveResult, BaseInfo, ReadBaseInfoAfterSaveDto);
    else throw new OperationNotSuccessfulException();
  }

  async update(
    id: number,
    data: CreateBaseInfoDto,
  ): Promise<ReadBaseInfoAfterSaveDto> {
    const _baseInfo = await this.repository.findOne({ where: { id: id } });

    if (!_baseInfo) throw new RequestedInfoNotFoundException();

    if (!_baseInfo.isEditable)
      throw new OperationNotSuccessfulException('امکان ویرایش وجود ندارد');

    _baseInfo.systemId = data.systemId;
    _baseInfo.name = data.name;
    _baseInfo.isEditable = data.isEditable;

    return this.mapper.map(
      await this.repository.save(_baseInfo),
      BaseInfo,
      ReadBaseInfoAfterSaveDto,
    );
  }

  async isExist(id: number) {
    return this.repository.exist({ where: { id: id } });
  }
}
