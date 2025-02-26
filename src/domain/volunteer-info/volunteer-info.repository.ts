import {VolunteerInfo} from "@/entities/volunteer-info.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FilterBaseInfoDto} from "@/domain/base-info/dto/filter-base-info.dto";
import {SortParam} from "@/common/dto/request-params/sort-param";


export class VolunteerInfoRepository extends Repository<VolunteerInfo> {
    constructor(
        @InjectRepository(VolunteerInfo)
        private readonly repository: Repository<VolunteerInfo>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    findById(id: number) {
        const query = this.repository
            .createQueryBuilder('volunteerInfo')
            .innerJoin('volunteerInfo.employmentSpectrum', 'employmentSpectrum')
            .innerJoin('volunteerInfo.employmentType', 'employmentType')
            .innerJoin('volunteerInfo.force', 'force')
            .innerJoin('volunteerInfo.gender', 'gender')
            .innerJoin('volunteerInfo.educationLevel', 'educationLevel')
            .innerJoin('volunteerInfo.educationField', 'educationField')
            .innerJoin('volunteerInfo.educationGrade', 'educationGrade')
            .leftJoin('volunteerInfo.birthPlace', 'birthPlace')
            .leftJoin('volunteerInfo.location', 'location')
            .leftJoin('volunteerInfo.applyPlace', 'applyPlace')
            .leftJoin('volunteerInfo.issuePlace', 'issuePlace')
            .leftJoin('volunteerInfo.marriageStatus', 'marriageStatus')
            .leftJoin('volunteerInfo.workingStatus', 'workingStatus')
            .leftJoin('volunteerInfo.physicalStatus', 'physicalStatus')
            .leftJoin('volunteerInfo.religion', 'religion')
            .leftJoin('volunteerInfo.nationality', 'nationality')
            .leftJoin('volunteerInfo.eyeColor', 'eyeColor')
            .leftJoin('volunteerInfo.institute', 'institute')
            .leftJoin('volunteerInfo.bloodGroup', 'bloodGroup')
            .leftJoin('volunteerInfo.dutyStatus', 'dutyStatus')
            .leftJoin('volunteerInfo.basijStatus', 'basijStatus')
            .select([
                'volunteerInfo.id',
                'volunteerInfo.nationalNo',
                'volunteerInfo.firstName',
                'volunteerInfo.lastName',
                'volunteerInfo.nickName',
                'volunteerInfo.previousLastName',
                'volunteerInfo.fatherName',
                'volunteerInfo.telephoneNumber',
                'volunteerInfo.mobileNumber',
                'volunteerInfo.idNo',
                'volunteerInfo.idSerial',
                'volunteerInfo.idSeri',
                'volunteerInfo.birthDate',
                'volunteerInfo.address',
                'volunteerInfo.postalCode',
                'volunteerInfo.issueDate',
                'volunteerInfo.jobTitle',
                'volunteerInfo.lastDegreeMean',
                'volunteerInfo.height',
                'volunteerInfo.weight',
                'volunteerInfo.childCount',
                'volunteerInfo.volunteerCode',
                'volunteerInfo.vaccination',
                'volunteerInfo.isInCommitteeEmdad',
                'volunteerInfo.isInBehzisti',
                'volunteerInfo.isElite',
                'volunteerInfo.isChampion',
                'volunteerInfo.isHafez',
                'volunteerInfo.basijDuration',
                'employmentSpectrum.id',
                'employmentSpectrum.name',
                'employmentType.id',
                'employmentType.name',
                'force.id',
                'force.name',
                'gender.id',
                'gender.name',
                'birthPlace.id',
                'birthPlace.title',
                'location.id',
                'location.title',
                'applyPlace.id',
                'applyPlace.title',
                'issuePlace.id',
                'issuePlace.title',
                'educationLevel.id',
                'educationLevel.name',
                'educationField.id',
                'educationField.name',
                'educationGrade.id',
                'educationGrade.name',
                'marriageStatus.id',
                'marriageStatus.name',
                'workingStatus.id',
                'workingStatus.name',
                'physicalStatus.id',
                'physicalStatus.name',
                'religion.id',
                'religion.name',
                'nationality.id',
                'nationality.name',
                'eyeColor.id',
                'eyeColor.name',
                'institute.id',
                'institute.name',
                'bloodGroup.id',
                'bloodGroup.name',
                'dutyStatus.id',
                'dutyStatus.name',
                'basijStatus.id',
                'basijStatus.name',
            ])
            .where('volunteerInfo.id = :id', {id: id});

        return query.getOne();
    }


    getAll(
        filterParam: any,
        sortParam: SortParam,
        page: number,
        pageLimit: number,
    ) {
        const query = this.repository
            .createQueryBuilder('volunteerInfo')
            .innerJoin('volunteerInfo.employmentSpectrum', 'employmentSpectrum')
            .innerJoin('volunteerInfo.employmentType', 'employmentType')
            .innerJoin('volunteerInfo.force', 'force')
            .innerJoin('volunteerInfo.gender', 'gender')
            .innerJoin('volunteerInfo.educationLevel', 'educationLevel')
            .innerJoin('volunteerInfo.educationField', 'educationField')
            .innerJoin('volunteerInfo.educationGrade', 'educationGrade')
            .leftJoin('volunteerInfo.birthPlace', 'birthPlace')
            .leftJoin('volunteerInfo.location', 'location')
            .leftJoin('volunteerInfo.applyPlace', 'applyPlace')
            .leftJoin('volunteerInfo.issuePlace', 'issuePlace')
            .leftJoin('volunteerInfo.marriageStatus', 'marriageStatus')
            .leftJoin('volunteerInfo.workingStatus', 'workingStatus')
            .leftJoin('volunteerInfo.physicalStatus', 'physicalStatus')
            .leftJoin('volunteerInfo.religion', 'religion')
            .leftJoin('volunteerInfo.nationality', 'nationality')
            .leftJoin('volunteerInfo.eyeColor', 'eyeColor')
            .leftJoin('volunteerInfo.institute', 'institute')
            .leftJoin('volunteerInfo.bloodGroup', 'bloodGroup')
            .leftJoin('volunteerInfo.dutyStatus', 'dutyStatus')
            .leftJoin('volunteerInfo.basijStatus', 'basijStatus')
            .select([
                'volunteerInfo.id',
                'volunteerInfo.nationalNo',
                'volunteerInfo.firstName',
                'volunteerInfo.lastName',
                'volunteerInfo.nickName',
                'volunteerInfo.previousLastName',
                'volunteerInfo.fatherName',
                'volunteerInfo.telephoneNumber',
                'volunteerInfo.mobileNumber',
                'volunteerInfo.idNo',
                'volunteerInfo.idSerial',
                'volunteerInfo.idSeri',
                'volunteerInfo.birthDate',
                'volunteerInfo.address',
                'volunteerInfo.postalCode',
                'volunteerInfo.issueDate',
                'volunteerInfo.jobTitle',
                'volunteerInfo.lastDegreeMean',
                'volunteerInfo.height',
                'volunteerInfo.weight',
                'volunteerInfo.childCount',
                'volunteerInfo.volunteerCode',
                'volunteerInfo.vaccination',
                'volunteerInfo.isInCommitteeEmdad',
                'volunteerInfo.isInBehzisti',
                'volunteerInfo.isElite',
                'volunteerInfo.isChampion',
                'volunteerInfo.isHafez',
                'volunteerInfo.basijDuration',
                'employmentSpectrum.id',
                'employmentSpectrum.name',
                'employmentType.id',
                'employmentType.name',
                'force.id',
                'force.name',
                'gender.id',
                'gender.name',
                'birthPlace.id',
                'birthPlace.title',
                'location.id',
                'location.title',
                'applyPlace.id',
                'applyPlace.title',
                'issuePlace.id',
                'issuePlace.title',
                'educationLevel.id',
                'educationLevel.name',
                'educationField.id',
                'educationField.name',
                'educationGrade.id',
                'educationGrade.name',
                'marriageStatus.id',
                'marriageStatus.name',
                'workingStatus.id',
                'workingStatus.name',
                'physicalStatus.id',
                'physicalStatus.name',
                'religion.id',
                'religion.name',
                'nationality.id',
                'nationality.name',
                'eyeColor.id',
                'eyeColor.name',
                'institute.id',
                'institute.name',
                'bloodGroup.id',
                'bloodGroup.name',
                'dutyStatus.id',
                'dutyStatus.name',
                'basijStatus.id',
                'basijStatus.name',
            ])
    .where('volunteerInfo.id = :volunteerInfoId', { volunteerInfoId: filterParam.volunteerInfoId })
            
            //     "(volunteerInfo.nationalNo LIKE N'%" +
            //       filterParam.nationalNo +
            //       "%')",
            //     { nationalNo: filterParam.nationalNo },
            //   )
            query.addSort(sortParam).addPagination(pageLimit, page);

            return query.getManyAndCount();
    }

    getAllWithFilter(
        body: any,
        page: number,
        pageLimit: number,
        sortParam: SortParam,
    ) {
        const query = this.repository
            .createQueryBuilder('volunteerInfo')
            .select([
                'volunteerInfo.id',
                'volunteerInfo.nationalNo',
                'volunteerInfo.firstName',
                'volunteerInfo.lastName',
                'volunteerInfo.fatherName',
            ])
            .where(
                "(:firstName::varchar is null or volunteerInfo.firstName LIKE N'%" +
                  body.firstName +
                  "%')",
                { firstName: body.firstName },
              )
              .andWhere(
                "(:lastName::varchar is null or volunteerInfo.lastName LIKE N'%" +
                  body.lastName +
                  "%')",
                { lastName: body.lastName },
              )
              .andWhere(
                "(:nationalNo::varchar is null or volunteerInfo.nationalNo LIKE N'%" +
                  body.nationalNo +
                  "%')",
                { nationalNo: body.nationalNo },
              );

            query.addSort(sortParam).addPagination(pageLimit, page);

            return query.getManyAndCount();
    }

    findSpecificVoluteerByNationalNumber(
      nationalNo: any,
  ) {
      const query = this.repository
          .createQueryBuilder('volunteerInfo')
          .select([
              'volunteerInfo.id',
              'volunteerInfo.nationalNo',
              'volunteerInfo.firstName',
              'volunteerInfo.lastName',
              'volunteerInfo.fatherName',
          ])
          .where(
            '(volunteerInfo.nationalNo = :nationalNo)',
            {
              nationalNo: nationalNo,
            },
          );

          return query.getOne();
  }


}