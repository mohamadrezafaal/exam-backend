import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { CreateBaseInfoItemDto } from './dto/create-base-info-item.dto';
import { BaseInfoItem } from '../../entities/base-info-item.entity';
import { ReadBaseInfoItemDto } from './dto/read-base-info-item.dto';
import { UpdateBaseInfoItemDto } from './dto/update-base-info-item.dto';

@Injectable()
export class BaseInfoItemProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, BaseInfoItem, ReadBaseInfoItemDto);
      createMap(mapper, ReadBaseInfoItemDto, BaseInfoItem);
      createMap(mapper, CreateBaseInfoItemDto, BaseInfoItem);
      createMap(mapper, UpdateBaseInfoItemDto, BaseInfoItem);
    };
  }
}
