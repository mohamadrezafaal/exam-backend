import { Mapper, createMap, forMember, mapWith } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { BaseInfoItem } from "@/entities/base-info-item.entity";
import { OrganPost } from "@/entities/organ-post.entity";
import { ReadBaseInfoItemDto } from "../base-info-item/dto/read-base-info-item.dto";
import { CreateOrganPostDto } from "./dto/create-organ-post.dto";
import { ReadOrganPostDto } from "./dto/read-organ-post.dto";
import { UpdateOrganPostDto } from "./dto/update-organ-post.dto";
import { ReadOrganDto } from "../organ/dto/read-organ.dto";
import { Organ } from "@/entities/organ.entity";

@Injectable()
export class OrganPostProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        OrganPost ,
        ReadOrganPostDto,
        // forMember(
        //   (d) => d.post,
        //   mapWith(ReadBaseInfoItemDto, BaseInfoItem, (s) => s.post),
        // ),
        forMember(
          (d) => d.organ,
          mapWith(ReadOrganDto, Organ, (s) => s.organ),
        ),
        forMember(
          (d) => d.postType,
          mapWith(ReadBaseInfoItemDto, BaseInfoItem, (s) => s.postType),
        ),
      );
      createMap(mapper, ReadOrganPostDto, OrganPost);
      createMap(mapper, CreateOrganPostDto, OrganPost);
      createMap(mapper, UpdateOrganPostDto, OrganPost);
    };
  }
}

