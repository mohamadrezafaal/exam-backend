import {ApiProperty} from "@nestjs/swagger";
import {AutoMap} from "@automapper/classes";

export class CreateVolunteerInfoDto {

    @AutoMap()
    @ApiProperty()
    employmentSpectrumId: number;

    @AutoMap()
    @ApiProperty()
    employmentTypeId: number;

    @AutoMap()
    @ApiProperty()
    forceId: number;

    @AutoMap()
    @ApiProperty()
    nationalNo: string;

    @AutoMap()
    @ApiProperty()
    firstName: string;

    @AutoMap()
    @ApiProperty()
    lastName: string;

    @AutoMap()
    @ApiProperty()
    nickName: string;

    @AutoMap()
    @ApiProperty()
    previousLastName: string;

    @AutoMap()
    @ApiProperty()
    genderId: number;

    @AutoMap()
    @ApiProperty()
    fatherName: string;

    @AutoMap()
    @ApiProperty()
    telephoneNumber: string;

    @AutoMap()
    @ApiProperty()
    mobileNumber: string;

    @AutoMap()
    @ApiProperty()
    idNo: string;

    @AutoMap()
    @ApiProperty()
    idSerial: string;

    @AutoMap()
    @ApiProperty()
    idSeri: string;

    @AutoMap()
    @ApiProperty()
    birthPlaceId: number;

    @AutoMap()
    @ApiProperty()
    birthDate: Date;

    @AutoMap()
    @ApiProperty()
    locationId: number;

    @AutoMap()
    @ApiProperty()
    address: string;

    @AutoMap()
    @ApiProperty()
    postalCode: string;

    @AutoMap()
    @ApiProperty()
    educationLevelId: number;

    @AutoMap()
    @ApiProperty()
    educationFieldId: number;

    @AutoMap()
    @ApiProperty()
    educationGradeId: number;

    @AutoMap()
    @ApiProperty()
    applyPlaceId: number;

    @AutoMap()
    @ApiProperty()
    issuePlaceId: number;

    @AutoMap()
    @ApiProperty()
    issueDate: Date;

    @AutoMap()
    @ApiProperty()
    marriageStatusId: number;

    @AutoMap()
    @ApiProperty()
    workingStatusId: number;

    @AutoMap()
    @ApiProperty()
    jobTitle: string;

    @AutoMap()
    @ApiProperty()
    physicalStatusId: number;

    @AutoMap()
    @ApiProperty()
    religionId: number;

    @AutoMap()
    @ApiProperty()
    nationalityId: number;

    @AutoMap()
    @ApiProperty()
    lastDegreeMean: number;

    @AutoMap()
    @ApiProperty()
    height: number;

    @AutoMap()
    @ApiProperty()
    weight: number;

    @AutoMap()
    @ApiProperty()
    childCount: number;

    @AutoMap()
    @ApiProperty()
    eyeColorId: number;

    @AutoMap()
    @ApiProperty()
    instituteId: number;

    @AutoMap()
    @ApiProperty()
    bloodGroupId: number;

    @AutoMap()
    @ApiProperty()
    dutyStatusId: number;

    @AutoMap()
    @ApiProperty()
    volunteerCode: string;

    @AutoMap()
    @ApiProperty()
    vaccination: string;

    @AutoMap()
    @ApiProperty()
    isInCommitteeEmdad: boolean;

    @AutoMap()
    @ApiProperty()
    isInBehzisti: boolean;

    @AutoMap()
    @ApiProperty()
    isElite: boolean;

    @AutoMap()
    @ApiProperty()
    isChampion: boolean;

    @AutoMap()
    @ApiProperty()
    isHafez: boolean;

    @AutoMap()
    @ApiProperty()
    basijStatusId: number;

    @AutoMap()
    @ApiProperty()
    basijDuration: number;

}
