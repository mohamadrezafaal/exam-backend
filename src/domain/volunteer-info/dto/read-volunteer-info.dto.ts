import {ApiProperty} from '@nestjs/swagger';
import {AutoMap} from '@automapper/classes';
import {ReadBaseInfoItemDto} from '../../base-info-item/dto/read-base-info-item.dto';
import {ReadGeographicalPlaceDto} from "@/domain/geographical-place/dto/read-geographical-place.dto";

export class ReadVolunteerInfoDto {

    @ApiProperty()
    @AutoMap()
    id: number;

    @ApiProperty({type: () => ReadBaseInfoItemDto})
    @AutoMap(() => ReadBaseInfoItemDto)
    employmentSpectrum: ReadBaseInfoItemDto;

    @ApiProperty({type: () => ReadBaseInfoItemDto})
    @AutoMap(() => ReadBaseInfoItemDto)
    employmentType: ReadBaseInfoItemDto;

    @ApiProperty({type: () => ReadBaseInfoItemDto})
    @AutoMap(() => ReadBaseInfoItemDto)
    force: ReadBaseInfoItemDto;

    @ApiProperty({type: () => ReadBaseInfoItemDto})
    @AutoMap(() => ReadBaseInfoItemDto)
    gender: ReadBaseInfoItemDto;

    @ApiProperty({type: () => ReadGeographicalPlaceDto})
    @AutoMap(() => ReadGeographicalPlaceDto)
    birthPlace: ReadGeographicalPlaceDto;

    @ApiProperty({type: () => ReadGeographicalPlaceDto})
    @AutoMap(() => ReadGeographicalPlaceDto)
    location: ReadGeographicalPlaceDto;

    @ApiProperty({type: () => ReadGeographicalPlaceDto})
    @AutoMap(() => ReadGeographicalPlaceDto)
    applyPlace: ReadGeographicalPlaceDto;

    @ApiProperty({type: () => ReadGeographicalPlaceDto})
    @AutoMap(() => ReadGeographicalPlaceDto)
    issuePlace: ReadGeographicalPlaceDto;


    @ApiProperty({type: () => ReadBaseInfoItemDto})
    @AutoMap(() => ReadBaseInfoItemDto)
    educationLevel: ReadBaseInfoItemDto;


    @ApiProperty({type: () => ReadBaseInfoItemDto})
    @AutoMap(() => ReadBaseInfoItemDto)
    educationField: ReadBaseInfoItemDto;


    @ApiProperty({type: () => ReadBaseInfoItemDto})
    @AutoMap(() => ReadBaseInfoItemDto)
    educationGrade: ReadBaseInfoItemDto;


    @ApiProperty({type: () => ReadBaseInfoItemDto})
    @AutoMap(() => ReadBaseInfoItemDto)
    marriageStatus: ReadBaseInfoItemDto;


    @ApiProperty({type: () => ReadBaseInfoItemDto})
    @AutoMap(() => ReadBaseInfoItemDto)
    workingStatus: ReadBaseInfoItemDto;


    @ApiProperty({type: () => ReadBaseInfoItemDto})
    @AutoMap(() => ReadBaseInfoItemDto)
    physicalStatus: ReadBaseInfoItemDto;


    @ApiProperty({type: () => ReadBaseInfoItemDto})
    @AutoMap(() => ReadBaseInfoItemDto)
    religion: ReadBaseInfoItemDto;

    @ApiProperty({type: () => ReadBaseInfoItemDto})
    @AutoMap(() => ReadBaseInfoItemDto)
    nationality: ReadBaseInfoItemDto;

    @ApiProperty({type: () => ReadBaseInfoItemDto})
    @AutoMap(() => ReadBaseInfoItemDto)
    eyeColor: ReadBaseInfoItemDto;

    @ApiProperty({type: () => ReadBaseInfoItemDto})
    @AutoMap(() => ReadBaseInfoItemDto)
    institute: ReadBaseInfoItemDto;

    @ApiProperty({type: () => ReadBaseInfoItemDto})
    @AutoMap(() => ReadBaseInfoItemDto)
    bloodGroup: ReadBaseInfoItemDto;

    @ApiProperty({type: () => ReadBaseInfoItemDto})
    @AutoMap(() => ReadBaseInfoItemDto)
    dutyStatus: ReadBaseInfoItemDto;

    @ApiProperty({type: () => ReadBaseInfoItemDto})
    @AutoMap(() => ReadBaseInfoItemDto)
    basijStatus: ReadBaseInfoItemDto;

    @ApiProperty()
    @AutoMap()
    nationalNo: string;

    @ApiProperty()
    @AutoMap()
    firstName: string;

    @ApiProperty()
    @AutoMap()
    lastName: string;

    @ApiProperty()
    @AutoMap()
    nickName: string;

    @ApiProperty()
    @AutoMap()
    previousLastName: string;

    @ApiProperty()
    @AutoMap()
    fatherName: string;

    @ApiProperty()
    @AutoMap()
    fullName: string;

    @ApiProperty()
    @AutoMap()
    telephoneNumber: string;

    @ApiProperty()
    @AutoMap()
    mobileNumber: string;

    @ApiProperty()
    @AutoMap()
    idNo: string;

    @ApiProperty()
    @AutoMap()
    idSerial: string;

    @ApiProperty()
    @AutoMap()
    idSeri: string;

    @ApiProperty()
    @AutoMap()
    birthDate: Date;

    @ApiProperty()
    @AutoMap()
    address: string;

    @ApiProperty()
    @AutoMap()
    postalCode: string;

    @ApiProperty()
    @AutoMap()
    issueDate: Date;


    @ApiProperty()
    @AutoMap()
    jobTitle: string;

    @ApiProperty()
    @AutoMap()
    lastDegreeMean: number;


    @ApiProperty()
    @AutoMap()
    height: number;

    @ApiProperty()
    @AutoMap()
    weight: number;

    @ApiProperty()
    @AutoMap()
    childCount: number;

    @ApiProperty()
    @AutoMap()
    volunteerCode: string;

    @ApiProperty()
    @AutoMap()
    vaccination: string;


    @ApiProperty()
    @AutoMap()
    isInCommitteeEmdad: boolean;

    @ApiProperty()
    @AutoMap()
    isInBehzisti: boolean;

    @ApiProperty()
    @AutoMap()
    isElite: boolean;

    @ApiProperty()
    @AutoMap()
    isChampion: boolean;

    @ApiProperty()
    @AutoMap()
    isHafez: boolean;

    @ApiProperty()
    @AutoMap()
    basijDuration: number;

}
