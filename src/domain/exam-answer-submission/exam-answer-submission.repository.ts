import { SortParam } from "@/common/dto/request-params/sort-param";
import { AnswerSubmission } from "@/entities/exam-answer-submission.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


export class AnswerSubmissionRepository extends Repository<AnswerSubmission> {
  constructor(
    @InjectRepository(AnswerSubmission)
    private readonly repository: Repository<AnswerSubmission>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  findById(id: number) {
    const query = this.repository
      .createQueryBuilder('answerSubmission')
      .innerJoin('answerSubmission.question', 'question')
      .leftJoin('answerSubmission.volunteerInfo', 'volunteerInfo')
      .leftJoin('answerSubmission.questionOption', 'questionOption')
      .select([
        'answerSubmission.id',
        'answerSubmission.answerSubmissionTime',
        'answerSubmission.questionId',
        'answerSubmission.volunteerInfoId',
        'answerSubmission.optionId',
        'answerSubmission.answerDescription',
        'question.id',
        'question.questionTitle',
        'question.order',
        'question.isDescriptive',
        'question.examId',
        'volunteerInfo.id',
        'volunteerInfo.employmentSpectrumId',
        'volunteerInfo.employmentTypeId',
        'volunteerInfo.forceId',
        'volunteerInfo.nationalNo',
        'volunteerInfo.firstName',
        'volunteerInfo.lastName',
        'volunteerInfo.nickName',
        'volunteerInfo.previousLastName',
        'volunteerInfo.genderId',
        'volunteerInfo.fatherName',
        'volunteerInfo.telephoneNumber',
        'volunteerInfo.mobileNumber',
        'volunteerInfo.idNo',
        'volunteerInfo.idSerial',
        'volunteerInfo.idSeri',
        'volunteerInfo.birthPlaceId',
        'volunteerInfo.birthDate',
        'volunteerInfo.locationId',
        'volunteerInfo.address',
        'volunteerInfo.postalCode',
        'volunteerInfo.educationLevelId',
        'volunteerInfo.educationFieldId',
        'volunteerInfo.educationGradeId',
        'volunteerInfo.applyPlaceId',
        'volunteerInfo.issuePlaceId',
        'volunteerInfo.issueDate',
        'volunteerInfo.marriageStatusId',
        'volunteerInfo.workingStatusId',
        'volunteerInfo.jobTitle',
        'volunteerInfo.physicalStatusId',
        'volunteerInfo.religionId',
        'volunteerInfo.nationalityId',
        'volunteerInfo.lastDegreeMean',
        'volunteerInfo.height',
        'volunteerInfo.weight',
        'volunteerInfo.childCount',
        'volunteerInfo.eyeColorId',
        'volunteerInfo.instituteId',
        'volunteerInfo.bloodGroupId',
        'volunteerInfo.dutyStatusId',
        'volunteerInfo.volunteerCode',
        'volunteerInfo.vaccination',
        'volunteerInfo.isInCommitteeEmdad',
        'volunteerInfo.isInBehzisti',
        'volunteerInfo.isElite',
        'volunteerInfo.isChampion',
        'volunteerInfo.isHafez',
        'volunteerInfo.basijStatusId',
        'volunteerInfo.basijDuration',
        'questionOption.id',
        'questionOption.questionId',
        'questionOption.optionDesc',
        'questionOption.order',
      ])
      .where('answerSubmission.id = :id', { id: id });

    return query.getOne();
  }

  getAll(
    filterParam: any,
    sortParam: SortParam,
    page: number,
    pageLimit: number,
  ) {
    const query = this.repository
    .createQueryBuilder('answerSubmission')
    .innerJoin('answerSubmission.question', 'question')
    .leftJoin('answerSubmission.volunteerInfo', 'volunteerInfo')
    .leftJoin('answerSubmission.questionOption', 'questionOption')
    .select([
      'answerSubmission.id',
      'answerSubmission.answerSubmissionTime',
      'answerSubmission.questionId',
      'answerSubmission.volunteerInfoId',
      'answerSubmission.optionId',
      'answerSubmission.answerDescription',
      'question.id',
      'question.questionTitle',
      'question.order',
      'question.isDescriptive',
      'question.examId',
      'volunteerInfo.id',
      'volunteerInfo.employmentSpectrumId',
      'volunteerInfo.employmentTypeId',
      'volunteerInfo.forceId',
      'volunteerInfo.nationalNo',
      'volunteerInfo.firstName',
      'volunteerInfo.lastName',
      'volunteerInfo.nickName',
      'volunteerInfo.previousLastName',
      'volunteerInfo.genderId',
      'volunteerInfo.fatherName',
      'volunteerInfo.telephoneNumber',
      'volunteerInfo.mobileNumber',
      'volunteerInfo.idNo',
      'volunteerInfo.idSerial',
      'volunteerInfo.idSeri',
      'volunteerInfo.birthPlaceId',
      'volunteerInfo.birthDate',
      'volunteerInfo.locationId',
      'volunteerInfo.address',
      'volunteerInfo.postalCode',
      'volunteerInfo.educationLevelId',
      'volunteerInfo.educationFieldId',
      'volunteerInfo.educationGradeId',
      'volunteerInfo.applyPlaceId',
      'volunteerInfo.issuePlaceId',
      'volunteerInfo.issueDate',
      'volunteerInfo.marriageStatusId',
      'volunteerInfo.workingStatusId',
      'volunteerInfo.jobTitle',
      'volunteerInfo.physicalStatusId',
      'volunteerInfo.religionId',
      'volunteerInfo.nationalityId',
      'volunteerInfo.lastDegreeMean',
      'volunteerInfo.height',
      'volunteerInfo.weight',
      'volunteerInfo.childCount',
      'volunteerInfo.eyeColorId',
      'volunteerInfo.instituteId',
      'volunteerInfo.bloodGroupId',
      'volunteerInfo.dutyStatusId',
      'volunteerInfo.volunteerCode',
      'volunteerInfo.vaccination',
      'volunteerInfo.isInCommitteeEmdad',
      'volunteerInfo.isInBehzisti',
      'volunteerInfo.isElite',
      'volunteerInfo.isChampion',
      'volunteerInfo.isHafez',
      'volunteerInfo.basijStatusId',
      'volunteerInfo.basijDuration',
      'questionOption.id',
      'questionOption.questionId',
      'questionOption.optionDesc',
      'questionOption.order',
    ]);
      // .where(
      //   "(:questionTitle::varchar is null or AnswerSubmission.questionTitle LIKE N'%" +
      //     filterParam.questionTitle +
      //     "%')",
      //   { questionTitle: filterParam.questionTitle },
      // )
      // .andWhere(
      //   '(:flagExam::bool IS NULL OR AnswerSubmission.examId IN (' +
      //     (filterParam.examId != null ? filterParam.examId.split(',') : null) +
      //     '))',
      //   {
      //     flagExam: filterParam.examId ? filterParam.examId?.length > 0 : null,

      //     examId: filterParam.examId,
      //   },
      // );
    query.addSort(sortParam).addPagination(pageLimit, page);

    return query.getManyAndCount();
  }
}
