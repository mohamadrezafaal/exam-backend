import { SortParam } from '@/common/dto/request-params/sort-param';
import '@/common/typeorm/select-query-builder-extentions';
import { Exam } from '@/entities/exam.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class ExamRepository extends Repository<Exam> {
  constructor(
    @InjectRepository(Exam)
    private readonly repository: Repository<Exam>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  findById(id: number) {
    const query = this.repository
      .createQueryBuilder('exam')
      .innerJoin('exam.examType', 'examType')
      .innerJoin('exam.examHold', 'examHold')
      .select([
        'exam.id',
        'exam.examTitle',
        'exam.examTypeId',
        'exam.examHoldId',
        'exam.duration',
        'exam.fromDate',
        'exam.toDate',
        'examType.id',
        'examType.name',
        'examHold.id',
        'examHold.name',
      ])
      .where('exam.id = :id', { id: id });

    return query.getOne();
  }

  getAll(
    filterParam: any,
    sortParam: SortParam,
    page: number,
    pageLimit: number,
  ) {
    const query = this.repository
      .createQueryBuilder('exam')
      .innerJoin('exam.examType', 'examType')
      .innerJoin('exam.examHold', 'examHold')
      .select([
        'exam.id',
        'exam.examTitle',
        'exam.examTypeId',
        'exam.examHoldId',
        'exam.duration',
        'exam.fromDate',
        'exam.toDate',
        'examType.id',
        'examType.name',
        'examHold.id',
        'examHold.name',
      ])
      .where(
        '(:flagExamType::bool IS NULL OR exam.examTypeId IN (' +
          (filterParam.examTypeId != null
            ? filterParam.examTypeId.split(',')
            : null) +
          '))',
        {
          flagExamType: filterParam.examTypeId
            ? filterParam.examTypeId?.length > 0
            : null,

          examTypeId: filterParam.examTypeId,
        },
      )
      .andWhere(
        '(:flagExamHold::bool IS NULL OR exam.examHoldId IN (' +
          (filterParam.examHoldId != null
            ? filterParam.examHoldId.split(',')
            : null) +
          '))',
        {
          flagExamHold: filterParam.examHoldId
            ? filterParam.examHoldId?.length > 0
            : null,

          examHoldId: filterParam.examHoldId,
        },
      )
      .andWhere('(:fromDate::timestamp IS NULL OR exam.fromDate = :fromDate)', {
        fromDate: filterParam.fromDate,
      })
      .andWhere('(:toDate::timestamp IS NULL OR exam.toDate = :toDate)', {
        toDate: filterParam.toDate,
      });
    query.addSort(sortParam).addPagination(pageLimit, page);

    return query.getManyAndCount();
  }
}
