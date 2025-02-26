import { SortParam } from "@/common/dto/request-params/sort-param";
import { QueryListResultDto } from "@/common/dto/result/query-list-result.dto";
import { RequestedInfoNotFoundException, OperationNotSuccessfulException } from "@/common/utils/exception";
import { AnswerSubmission } from "@/entities/exam-answer-submission.entity";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { CreateAnswerSubmissionDto } from "./dto/create-exam-answer-submission.dto";
import { ReadAnswerSubmissionDto } from "./dto/read-exam-answer-submission.dto";
import { UpdateAnswerSubmissionDto } from "./dto/update-exam-answer-submission.dto";
import { AnswerSubmissionRepository } from "./exam-answer-submission.repository";

@Injectable()
export class AnswerSubmissionService extends TypeOrmCrudService<AnswerSubmission> {

    constructor(
        @InjectMapper() private readonly mapper: Mapper,
        private readonly repository: AnswerSubmissionRepository,
    ) {
        super(repository);
    }

    async deleteById(id: number): Promise<AnswerSubmission> {
        const criteria = {id: id};
        const exam = await this.repository.findOne({where: criteria});
        if (!exam) throw new RequestedInfoNotFoundException();
        return await this.repository.remove(exam);
    }

    async create(data: CreateAnswerSubmissionDto): Promise<ReadAnswerSubmissionDto> {
        const instance = this.mapper.map(data, CreateAnswerSubmissionDto, AnswerSubmission);
        const saveResult = await this.repository.save(instance);
        if (saveResult.id > 0)
            return this.mapper.map(saveResult, AnswerSubmission, ReadAnswerSubmissionDto);
        else throw new OperationNotSuccessfulException();
    }
    
    async update(
        id: number,
        data: UpdateAnswerSubmissionDto,
    ): Promise<ReadAnswerSubmissionDto> {
        const answerSubmission = await this.repository.findOne({
            where: {id: id},
        });
    
        if (!answerSubmission) throw new RequestedInfoNotFoundException();
    
        answerSubmission.answerSubmissionTime = data.answerSubmissionTime;
        answerSubmission.questionId = data.questionId;
        answerSubmission.volunteerInfoId = data.volunteerInfoId;
        answerSubmission.optionId = data.optionId;
        answerSubmission.answerDescription = data.answerDescription;
        return this.mapper.map(
            await this.repository.save(answerSubmission),
            AnswerSubmission,
            ReadAnswerSubmissionDto,
        );
    
    }
    
    async getById(id: number): Promise<ReadAnswerSubmissionDto> {
        const result = await this.repository.findById(id);
        if (!result) throw new RequestedInfoNotFoundException();
        return this.mapper.map(result, AnswerSubmission, ReadAnswerSubmissionDto);
    }
    
    async getAll(
        filterParam: any,
        sortParam: SortParam,
        page: number,
        pageLimit: number,
    ): Promise<QueryListResultDto<ReadAnswerSubmissionDto>> {
        const [data, count] = await this.repository.getAll(
            filterParam,
            sortParam,
            page,
            pageLimit
        );
    
        return {
            total: count,
            data: this.mapper.mapArray(data, AnswerSubmission, ReadAnswerSubmissionDto),
        };
    }

}