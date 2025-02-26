import {createMap, forMember, mapFrom, Mapper, mapWith,} from '@automapper/core';
import {AutomapperProfile, InjectMapper} from '@automapper/nestjs';
import {Injectable} from '@nestjs/common';
import {CreateVolunteerInfoDto} from "@/domain/volunteer-info/dto/create-volunteer-info.dto";
import {VolunteerInfo} from "@/entities/volunteer-info.entity";
import {ReadVolunteerInfoDto} from "@/domain/volunteer-info/dto/read-volunteer-info.dto";
import { BaseInfoItem } from '@/entities/base-info-item.entity';
import { ReadBaseInfoItemDto } from '../base-info-item/dto/read-base-info-item.dto';
import { UpdateVolunteerInfoDto } from './dto/update-volunteer-info.dto';

@Injectable()
export class VolunteerInfoProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, CreateVolunteerInfoDto, VolunteerInfo);
            createMap(mapper, UpdateVolunteerInfoDto, VolunteerInfo);
            createMap(mapper, ReadVolunteerInfoDto, VolunteerInfo);
            createMap(mapper, VolunteerInfo, ReadVolunteerInfoDto,
                forMember(
                    (d) => d.educationLevel,
                    mapWith(
                      ReadBaseInfoItemDto,
                      BaseInfoItem,
                      (s) => s.educationLevel,
                    ),
                  ),
                forMember(
                    (des) => des.idNo,
                    mapFrom((source) => source.idNo),
                ),
                forMember(
                    (d) => d.fullName,
                    mapFrom((s) =>
                        `${s.firstName} ${s.lastName}`
                    )
                ),
                forMember(
                    (des) => des.idSerial,
                    mapFrom((source) => source.idSerial),
                ),
                forMember(
                    (des) => des.idSeri,
                    mapFrom((source) => source.idSeri),
                ),
            );
        };
    }
}
