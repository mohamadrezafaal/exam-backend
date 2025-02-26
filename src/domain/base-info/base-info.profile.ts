import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  Mapper,
  forMember,
  mapWith,
  mapFrom,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { BaseInfo } from '@/entities/base-info.entity';
import { ReadBaseInfoDto } from './dto/read-base-info.dto';
import { CreateBaseInfoDto } from './dto/create-base-info.dto';
import { ReadBaseInfoItemDto } from '../base-info-item/dto/read-base-info-item.dto';
import { BaseInfoItem } from '@/entities/base-info-item.entity';
import { ReadBaseInfoAfterSaveDto } from './dto/read-base-info-after-save.dto';

@Injectable()
export class BaseInfoProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        BaseInfo,
        ReadBaseInfoDto,
        /* forMember(
          (d) => d.items,
          mapWith(ReadBaseInfoItemDto, BaseInfoItem, (s) => s.items),
        ),*/
      );
      createMap(mapper, BaseInfo, ReadBaseInfoAfterSaveDto);
      createMap(mapper, ReadBaseInfoDto, BaseInfo);
      createMap(mapper, CreateBaseInfoDto, BaseInfo);
    };
  }
}
