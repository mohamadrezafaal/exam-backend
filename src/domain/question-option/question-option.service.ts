import {Injectable} from '@nestjs/common';
import {InjectMapper} from '@automapper/nestjs';
import {Mapper} from '@automapper/core';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {OperationNotSuccessfulException, RequestedInfoNotFoundException} from "@/common/utils/exception";
import {FilterBaseInfoDto} from "@/domain/base-info/dto/filter-base-info.dto";
import {SortParam} from "@/common/dto/request-params/sort-param";
import {QueryListResultDto} from "@/common/dto/result/query-list-result.dto";
import { QuestionOption } from '@/entities/question-option.entity';
import { QuestionOptionRepository } from '@/domain/question-option/question-option.repository';
import { ReadQuestionOptionDto } from '@/domain/question-option/dto/read-question-option.dto';
import { CreateQuestionOptionDto } from '@/domain/question-option/dto/create-question-option.dto';
import { UpdateQuestionOptionDto } from '@/domain/question-option/dto/update-question-option.dto';

@Injectable()
export class QuestionOptionService extends TypeOrmCrudService<QuestionOption> {

    constructor(
        @InjectMapper() private readonly mapper: Mapper,
        private readonly repository: QuestionOptionRepository,
    ) {
        super(repository);
    }

    async deleteById(id: number): Promise<QuestionOption> {
        const criteria = {id: id};
        const questionOption = await this.repository.findOne({where: criteria});
        if (!questionOption) throw new RequestedInfoNotFoundException();
        return await this.repository.remove(questionOption);
    }

    async create(data: CreateQuestionOptionDto): Promise<ReadQuestionOptionDto> {
        const instance = this.mapper.map(data, CreateQuestionOptionDto, QuestionOption);
        const saveResult = await this.repository.save(instance);
        if (saveResult.id > 0)
            return this.mapper.map(saveResult, QuestionOption, ReadQuestionOptionDto);
        else throw new OperationNotSuccessfulException();
    } 

    async update(
        id: number,
        data: UpdateQuestionOptionDto,
    ): Promise<ReadQuestionOptionDto> {
        const questionOption = await this.repository.findOne({
            where: {id: id},
        });

        if (!questionOption) throw new RequestedInfoNotFoundException();

        questionOption.optionDesc = data.optionDesc;
        // questionOption.questionId = data.questionId;

        return this.mapper.map(
            await this.repository.save(questionOption),
            QuestionOption,
            ReadQuestionOptionDto,
        );

    }

    async getById(id: number): Promise<ReadQuestionOptionDto> {
        const result = await this.repository.findById(id);
        if (!result) throw new RequestedInfoNotFoundException();
        return this.mapper.map(result, QuestionOption, ReadQuestionOptionDto);
    }

    async getAll(
        filterParam: FilterBaseInfoDto,
        sortParam: SortParam,
        page: number,
        pageLimit: number,
        questionId
    ): Promise<QueryListResultDto<ReadQuestionOptionDto>> {
        const [data, count] = await this.repository.getAll(
            filterParam,
            sortParam,
            page,
            pageLimit,
            questionId
        );

        return {
            total: count,
            data: this.mapper.mapArray(data, QuestionOption, ReadQuestionOptionDto),
        };
    }
}