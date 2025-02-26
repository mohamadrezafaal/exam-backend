import { Mapper, createMap, forMember, mapWith } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Organ } from '@/entities/organ.entity';
import { BaseInfoItem } from "@/entities/base-info-item.entity";
import { ReadBaseInfoItemDto } from "../base-info-item/dto/read-base-info-item.dto";
import { CreateOrganDto } from './dto/create-organ.dto';
import { ReadOrganDto } from './dto/read-organ.dto';
import { UpdateOrganDto } from './dto/update-organ.dto';
import { ReadTrainingUnitDto } from "@/domain/organ/dto/read-training-unit.dto";

@Injectable()
export class OrganProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        Organ ,
        ReadOrganDto,
        forMember(
          (d) => d.force,
          mapWith(ReadBaseInfoItemDto, BaseInfoItem, (s) => s.force),
        ),
        forMember(
          (d) => d.organType,
          mapWith(ReadBaseInfoItemDto, BaseInfoItem, (s) => s.organType),
        ),
      );
      createMap(mapper, ReadOrganDto, Organ);
      createMap(mapper, CreateOrganDto, Organ);
      createMap(mapper, UpdateOrganDto, Organ);
      createMap(mapper,Organ,ReadTrainingUnitDto);
    };
  }
}
