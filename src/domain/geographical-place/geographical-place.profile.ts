import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  mapWith,
} from '@automapper/core';
import { GeographicalPlace } from '../../entities/geographical-place.entity';
import { ReadGeographicalPlaceDto } from './dto/read-geographical-place.dto';

@Injectable()
export class GeographicalPlaceProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        GeographicalPlace,
        ReadGeographicalPlaceDto,
        forMember(
          (des) => des.parentId,
          mapFrom((source) =>
            source.parentId === null ? null : source.parentId,
          ),
        ),
        forMember(
          (des) => des.isParent,
          mapFrom((source) => Math.abs(source.leftId - source.rightId) > 1),
        ),
      );
    };
  }
}
