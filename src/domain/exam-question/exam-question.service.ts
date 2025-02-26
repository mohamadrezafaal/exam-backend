import {Injectable} from '@nestjs/common';
import {InjectMapper} from '@automapper/nestjs';
import {Mapper} from '@automapper/core';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {OperationNotSuccessfulException, RequestedInfoNotFoundException} from "@/common/utils/exception";
import {FilterBaseInfoDto} from "@/domain/base-info/dto/filter-base-info.dto";
import {SortParam} from "@/common/dto/request-params/sort-param";
import {QueryListResultDto} from "@/common/dto/result/query-list-result.dto";
import {Question} from "@/entities/question.entity";
import {ExamQuestionRepository} from "@/domain/exam-question/exam-question.repository";
import {ReadExamQuestionDto} from "@/domain/exam-question/dto/read-exam-question.dto";
import {CreateExamQuestionDto} from "@/domain/exam-question/dto/create-exam-question.dto";
import { UpdateExamQuestionDto } from '@/domain/exam-question/dto/update-exam-question.dto';

@Injectable()
export class ExamQuestionService extends TypeOrmCrudService<Question> {

    constructor(
        @InjectMapper() private readonly mapper: Mapper,
        private readonly repository: ExamQuestionRepository,
    ) {
        super(repository);
    }

    async deleteById(id: number): Promise<Question> {
        const criteria = {id: id};
        const exam = await this.repository.findOne({where: criteria});
        if (!exam) throw new RequestedInfoNotFoundException();
        return await this.repository.remove(exam);
    }

    async create(data: CreateExamQuestionDto): Promise<ReadExamQuestionDto> {
        const instance = this.mapper.map(data, CreateExamQuestionDto, Question);
        const saveResult = await this.repository.save(instance);
        if (saveResult.id > 0)
            return this.mapper.map(saveResult, Question, ReadExamQuestionDto);
        else throw new OperationNotSuccessfulException();
    }
    
    async update(
        id: number,
        data: UpdateExamQuestionDto,
    ): Promise<ReadExamQuestionDto> {
        const question = await this.repository.findOne({
            where: {id: id},
        });
    
        if (!question) throw new RequestedInfoNotFoundException();
    
        question.questionTitle = data.questionTitle;
        // question.examId = data.examId;
        question.order = data.order;
        question.isDescriptive = data.isDescriptive;
        return this.mapper.map(
            await this.repository.save(question),
            Question,
            ReadExamQuestionDto,
        );
    
    }
    
    async getById(id: number): Promise<ReadExamQuestionDto> {
        const result = await this.repository.findById(id);
        if (!result) throw new RequestedInfoNotFoundException();
        return this.mapper.map(result, Question, ReadExamQuestionDto);
    }
    
    async getAll(
        filterParam: any,
        sortParam: SortParam,
        page: number,
        pageLimit: number,
    ): Promise<QueryListResultDto<ReadExamQuestionDto>> {
        const [data, count] = await this.repository.getAllByExamId(
            filterParam,
            sortParam,
            page,
            pageLimit
        );
    
        return {
            total: count,
            data: this.mapper.mapArray(data, Question, ReadExamQuestionDto),
        };
    }

}