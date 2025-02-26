import { Mapper, createMap, forMember, mapFrom, mapWith } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { BaseInfoItem } from "@/entities/base-info-item.entity";
import { GeographicalPlace } from "@/entities/geographical-place.entity";
import { OrganProperty } from "@/entities/organ-property.entity";
import { Organ } from "@/entities/organ.entity";
import { ReadBaseInfoItemDto } from "../base-info-item/dto/read-base-info-item.dto";
import { ReadGeographicalPlaceDto } from "../geographical-place/dto/read-geographical-place.dto";
import { ReadOrganDto } from "../organ/dto/read-organ.dto";
import { CreateOrganPropertyDto } from "./dto/create-organ-property.dto";
import { ReadOrganPropertyDto } from "./dto/read-organ-property.dto";
import { UpdateOrganPropertyDto } from "./dto/update-organ-property.dto";
@Injectable()
export class OrganPropertyProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        OrganProperty,
        ReadOrganPropertyDto,
        forMember(
          (d) => d.geographicalPlace,
          mapWith(ReadGeographicalPlaceDto, GeographicalPlace, (s) => s.geographicalPlace),
        ),
        forMember(
          (d) => d.organ,
          mapWith(ReadOrganDto, Organ, (s) => s.organ),
        ),
        forMember(
          (d) => d.areaType,
          mapWith(ReadBaseInfoItemDto, BaseInfoItem, (s) => s.areaType),
        ),
        forMember(
          (d) => d.badWeatherDegree,
          mapWith(ReadBaseInfoItemDto, BaseInfoItem, (s) => s.badWeatherDegree),
        ),
        forMember(
          (d) => d.deprivationDegree,
          mapWith(ReadBaseInfoItemDto, BaseInfoItem, (s) => s.deprivationDegree),
        ),
      );
      createMap(mapper, ReadOrganPropertyDto, OrganProperty);
      createMap(mapper,
        CreateOrganPropertyDto,
        OrganProperty,
        forMember(
          (d) => d.changeDate,
          mapFrom((s) => s.changeDate),
        ),);
      createMap(mapper, UpdateOrganPropertyDto, OrganProperty);
    };
  }
}

