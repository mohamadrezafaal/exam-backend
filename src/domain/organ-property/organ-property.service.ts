import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeleteResult } from 'typeorm';
import {
  OperationNotSuccessfulException,
  RequestedInfoNotFoundException,
} from '../../common/utils/exception';
import { CreateOrganPropertyDto } from './dto/create-organ-property.dto';
import { ReadOrganPropertyDto } from './dto/read-organ-property.dto';
import { OrganPropertyRepository } from './organ-property.repository';
import { OrganProperty } from '@/entities/organ-property.entity';
import {QueryListResultDto} from "@/common/dto/result/query-list-result.dto";


@Injectable()
export class OrganPropertyService extends TypeOrmCrudService<OrganProperty> {
  constructor(
    private readonly repository: OrganPropertyRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    super(repository);
  }

  async getById(id: number,pageLimit:number, page:number): Promise<QueryListResultDto<ReadOrganPropertyDto>> {
    const [data , count] = await this.repository.findByOrganId(id,pageLimit, page);
    if (!data) throw new RequestedInfoNotFoundException();

    return {
      total:count,
      data: await this.mapper.mapArrayAsync(data,OrganProperty,ReadOrganPropertyDto)
    }
  }

  async create(data: CreateOrganPropertyDto): Promise<ReadOrganPropertyDto> {
    const _organProperty = this.mapper.map(data, CreateOrganPropertyDto, OrganProperty);
    const saveResult = await this.repository.save(_organProperty);
    if (saveResult.id > 0)
      return this.mapper.map(saveResult, OrganProperty, ReadOrganPropertyDto);
    else throw new OperationNotSuccessfulException();
  }

  async update(organId: number, data: CreateOrganPropertyDto): Promise<ReadOrganPropertyDto> {
    const _organProperty = await this.repository.findOne({ where: { organId: organId } });

    if (!_organProperty) throw new RequestedInfoNotFoundException();

    // _organProperty.organId = data.organId;
    // _organProperty.changeDate = data.changeDate;
    // _organProperty.geographicalPlaceId = data.geographicalPlaceId;
    // _organProperty.deprivationDegreeId = data.deprivationDegreeId;
    // _organProperty.badWeatherDegreeId = data.badWeatherDegreeId;
    // _organProperty.postTypeId = data.postTypeId;
    // _organProperty.areaTypeId = data.areaTypeId;
      
    return this.mapper.map(
      await this.repository.save(_organProperty),
      OrganProperty,
      ReadOrganPropertyDto,
    );
  }

  async deleteById(id: number): Promise<OrganProperty> {
    const criteria = { id: id };
    const organProperty = await this.repository.findOne({ where: criteria });
    if (!organProperty) throw new RequestedInfoNotFoundException();
    return await this.repository.remove(organProperty);
  }
}
