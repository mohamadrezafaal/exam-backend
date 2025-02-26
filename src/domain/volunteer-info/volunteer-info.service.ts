import {Injectable} from '@nestjs/common';
import {InjectMapper} from '@automapper/nestjs';
import {Mapper} from '@automapper/core';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {VolunteerInfo} from '@/entities/volunteer-info.entity';
import {VolunteerInfoRepository} from '@/domain/volunteer-info/volunteer-info.repository';
import {OperationNotSuccessfulException, RequestedInfoNotFoundException} from "@/common/utils/exception";
import {CreateVolunteerInfoDto} from "@/domain/volunteer-info/dto/create-volunteer-info.dto";
import {ReadVolunteerInfoDto} from "@/domain/volunteer-info/dto/read-volunteer-info.dto";
import {FilterBaseInfoDto} from "@/domain/base-info/dto/filter-base-info.dto";
import {SortParam} from "@/common/dto/request-params/sort-param";
import {QueryListResultDto} from "@/common/dto/result/query-list-result.dto";
import {UpdateVolunteerInfoDto} from "@/domain/volunteer-info/dto/update-volunteer-info.dto";

@Injectable()
export class VolunteerInfoService extends TypeOrmCrudService<VolunteerInfo> {

    constructor(
        @InjectMapper() private readonly mapper: Mapper,
        private readonly repository: VolunteerInfoRepository,
    ) {
        super(repository);
    }

    async deleteById(id: number): Promise<VolunteerInfo> {
        const criteria = {id: id};
        const volunteerInfo = await this.repository.findOne({where: criteria});
        if (!volunteerInfo) throw new RequestedInfoNotFoundException();
        return await this.repository.remove(volunteerInfo);
    }

    async create(data: CreateVolunteerInfoDto): Promise<ReadVolunteerInfoDto> {
        const instance = this.mapper.map(data, CreateVolunteerInfoDto, VolunteerInfo);
        const saveResult = await this.repository.save(instance);
        if (saveResult.id > 0)
            return this.mapper.map(saveResult, VolunteerInfo, ReadVolunteerInfoDto);
        else throw new OperationNotSuccessfulException();
    }

    async update(
        id: number,
        data: UpdateVolunteerInfoDto,
    ): Promise<ReadVolunteerInfoDto> {
        const volunteerInfo = await this.repository.findOne({
            where: {id: id},
        });

        if (!volunteerInfo) throw new RequestedInfoNotFoundException();

        volunteerInfo.employmentSpectrumId = data.employmentSpectrumId;
        volunteerInfo.employmentTypeId = data.employmentTypeId;
        volunteerInfo.forceId = data.forceId;
        volunteerInfo.genderId = data.genderId;
        volunteerInfo.birthPlaceId = data.birthPlaceId;
        volunteerInfo.locationId = data.locationId;
        volunteerInfo.applyPlaceId = data.applyPlaceId;
        volunteerInfo.issuePlaceId = data.issuePlaceId;
        volunteerInfo.educationLevelId = data.educationLevelId;
        volunteerInfo.educationFieldId = data.educationFieldId;
        volunteerInfo.educationGradeId = data.educationGradeId;
        volunteerInfo.marriageStatusId = data.marriageStatusId;
        volunteerInfo.workingStatusId = data.workingStatusId;
        volunteerInfo.physicalStatusId = data.physicalStatusId;
        volunteerInfo.religionId = data.religionId;
        volunteerInfo.nationalityId = data.nationalityId;
        volunteerInfo.eyeColorId = data.eyeColorId;
        volunteerInfo.instituteId = data.instituteId;
        volunteerInfo.bloodGroupId = data.bloodGroupId;
        volunteerInfo.dutyStatusId = data.dutyStatusId;
        volunteerInfo.basijStatusId = data.basijStatusId;

        volunteerInfo.nationalNo = data.nationalNo;
        volunteerInfo.firstName = data.firstName;
        volunteerInfo.lastName = data.lastName;
        volunteerInfo.nickName = data.nickName;
        volunteerInfo.previousLastName = data.previousLastName;
        volunteerInfo.fatherName = data.fatherName;
        volunteerInfo.telephoneNumber = data.telephoneNumber;
        volunteerInfo.mobileNumber = data.mobileNumber;
        volunteerInfo.idNo = data.idNo;
        volunteerInfo.idSerial = data.idSerial;
        volunteerInfo.idSeri = data.idSeri;
        volunteerInfo.birthDate = data.birthDate;
        volunteerInfo.address = data.address;
        volunteerInfo.postalCode = data.postalCode;
        volunteerInfo.issueDate = data.issueDate;
        volunteerInfo.jobTitle = data.jobTitle;
        volunteerInfo.lastDegreeMean = data.lastDegreeMean;
        volunteerInfo.height = data.height;
        volunteerInfo.weight = data.weight;
        volunteerInfo.childCount = data.childCount;
        volunteerInfo.volunteerCode = data.volunteerCode;
        volunteerInfo.vaccination = data.vaccination;
        volunteerInfo.isInCommitteeEmdad = data.isInCommitteeEmdad;
        volunteerInfo.isInBehzisti = data.isInBehzisti;
        volunteerInfo.isElite = data.isElite;
        volunteerInfo.isChampion = data.isChampion;
        volunteerInfo.isHafez = data.isHafez;
        volunteerInfo.basijDuration = data.basijDuration;

        return this.mapper.map(
            await this.repository.save(volunteerInfo),
            VolunteerInfo,
            ReadVolunteerInfoDto,
        );

    }

    async getById(id: number): Promise<ReadVolunteerInfoDto> {
        const result = await this.repository.findById(id);
        if (!result) throw new RequestedInfoNotFoundException();
        return this.mapper.map(result, VolunteerInfo, ReadVolunteerInfoDto);
    }

    async getAll(
        filterParam: FilterBaseInfoDto,
        sortParam: SortParam,
        page: number,
        pageLimit: number,
    ): Promise<QueryListResultDto<ReadVolunteerInfoDto>> {
        const [data, count] = await this.repository.getAll(
            filterParam,
            sortParam,
            page,
            pageLimit
        );

        return {
            total: count,
            data: this.mapper.mapArray(data, VolunteerInfo, ReadVolunteerInfoDto),
        };
    }

    async getAllWithFilter(
        body: any,
        page: number,
        pageLimit: number,
        sortParam: SortParam,
    ): Promise<QueryListResultDto<ReadVolunteerInfoDto>> {
        const [data, count] = await this.repository.getAllWithFilter(
            body,
            page,
            pageLimit,
            sortParam,
        );

        return {
            total: count,
            data: this.mapper.mapArray(data, VolunteerInfo, ReadVolunteerInfoDto),
        };
    }

    async findSpecificVoluteerByNationalNumber(
        nationalNo: any,
    ): Promise<ReadVolunteerInfoDto> {
        const data = await this.repository.findSpecificVoluteerByNationalNumber(
            nationalNo,
        );
       return this.mapper.map(data, VolunteerInfo, ReadVolunteerInfoDto)
    }

}