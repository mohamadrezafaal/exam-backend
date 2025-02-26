import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {FilterBaseInfoDto} from "@/domain/base-info/dto/filter-base-info.dto";
import {SortParam} from "@/common/dto/request-params/sort-param";
import { QuestionOption } from "@/entities/question-option.entity";
import '@/common/typeorm/select-query-builder-extentions';



export class QuestionOptionRepository extends Repository<QuestionOption> {
    constructor(
        @InjectRepository(QuestionOption)
        private readonly repository: Repository<QuestionOption>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    findById(id: number) {
        const query = this.repository
            .createQueryBuilder('questionOption')
            .innerJoin('questionOption.question', 'question')
            .leftJoin('questionOption.attachments', 'attachments')
            .select([
                'questionOption.id',
                'questionOption.optionDesc',
                'questionOption.order',
                'question.id',
                'question.questionTitle',
                'attachments.id',
                'attachments.type',
                'attachments.fileName',
                'attachments.attachmentId',
            ])
            .where('questionOption.id = :id', {id: id});

        return query.getOne();
    }

    getAll(
        filterParam: FilterBaseInfoDto,
        sortParam: SortParam,
        page: number,
        pageLimit: number,
        questionId: number
    ) {
        const query = this.repository
            .createQueryBuilder('questionOption')
            .innerJoin('questionOption.question', 'question')
            .leftJoin('questionOption.attachments', 'attachments')
            .select([
                'questionOption.id',
                'questionOption.optionDesc',
                'questionOption.order',
                'question.id',
                'question.questionTitle',
                'attachments.id',
                'attachments.type',
                'attachments.fileName',
                'attachments.attachmentId',
            ])
            .where('questionOption.questionId = :questionId', {questionId: questionId});


        query.addSort(sortParam).addPagination(pageLimit, page);

        return query.getManyAndCount();
    }
    
}