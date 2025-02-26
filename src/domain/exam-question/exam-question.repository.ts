import { SortParam } from '@/common/dto/request-params/sort-param';
import { Question } from '@/entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class ExamQuestionRepository extends Repository<Question> {
  constructor(
    @InjectRepository(Question)
    private readonly repository: Repository<Question>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  findById(id: number) {
    const query = this.repository
      .createQueryBuilder('question')
      .innerJoin('question.exam', 'exam')
      .leftJoin('question.attachments', 'attachments')
      .leftJoin('question.options', 'options')
      .leftJoin('options.attachments', 'optionsAttachments')
      .select([
        'question.id',
        'question.questionTitle',
        'question.order',
        'question.isDescriptive',
        'question.examId',
        'exam.id',
        'exam.examTitle',
        'attachments.id',
        'attachments.fileName',
        'attachments.attachmentId',
        'options.id',
        'options.optionDesc',
        'options.order',
        'optionsAttachments.id',
        'optionsAttachments.fileName',
        'optionsAttachments.attachmentId',
      ])
      .where('question.id = :id', { id: id });

    return query.getOne();
  }

  getAllByExamId(
    filterParam: any,
    sortParam: SortParam,
    page: number,
    pageLimit: number,
  ) {
    const query = this.repository
      .createQueryBuilder('question')
      .innerJoin('question.exam', 'exam')
      .leftJoin('question.attachments', 'attachments')
      .leftJoin('question.options', 'options')
      .leftJoin('options.attachments', 'optionsAttachments')
      .select([
        'question.id',
        'question.questionTitle',
        'question.order',
        'question.isDescriptive',
        'question.examId',
        'exam.id',
        'exam.examTitle',
        'attachments.id',
        'attachments.fileName',
        'attachments.attachmentId',
        'options.id',
        'options.optionDesc',
        'options.order',
        'optionsAttachments.id',
        'optionsAttachments.fileName',
        'optionsAttachments.attachmentId',
      ])
      .where(
        "(:questionTitle::varchar is null or question.questionTitle LIKE N'%" +
          filterParam.questionTitle +
          "%')",
        { questionTitle: filterParam.questionTitle },
      )
      .andWhere(
        '(:flagExam::bool IS NULL OR question.examId IN (' +
          (filterParam.examId != null ? filterParam.examId.split(',') : null) +
          '))',
        {
          flagExam: filterParam.examId ? filterParam.examId?.length > 0 : null,

          examId: filterParam.examId,
        },
      );
    query.addSort(sortParam).addPagination(pageLimit, page);

    return query.getManyAndCount();
  }
}
