import { Mapper, createMap, forMember, mapWith } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { BaseInfoItem } from "@/entities/base-info-item.entity";
import { ReadBaseInfoItemDto } from "../base-info-item/dto/read-base-info-item.dto";
import { CreateOrganOperationalDto } from "./dto/create-organ-operational.dto";
import { ReadOrganOperationalDto } from "./dto/read-organ-operational.dto";
import { UpdateOrganOperationalDto } from "./dto/update-organ-operational.dto";
import { OrganOperational } from "@/entities/organ-operational.entity";
import { Organ } from "@/entities/organ.entity";
import { ReadOrganDto } from "@/domain/organ/dto/read-organ.dto";

@Injectable()
export class OrganOperationalProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        OrganOperational ,
        ReadOrganOperationalDto,
        forMember(
          (d) => d.organ,
          mapWith(ReadOrganDto, Organ, (s) => s.organ),
        ),
        forMember(
          (d) => d.operational,
          mapWith(ReadBaseInfoItemDto, BaseInfoItem, (s) => s.operational),
        ),
      );
      createMap(mapper, ReadOrganOperationalDto, OrganOperational);
      createMap(mapper, CreateOrganOperationalDto, OrganOperational);
      createMap(mapper, UpdateOrganOperationalDto, OrganOperational);
    };
  }
}

