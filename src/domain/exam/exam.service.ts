import {Injectable} from '@nestjs/common';
import {InjectMapper} from '@automapper/nestjs';
import {Mapper} from '@automapper/core';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {OperationNotSuccessfulException, RequestedInfoNotFoundException} from "@/common/utils/exception";
import {FilterBaseInfoDto} from "@/domain/base-info/dto/filter-base-info.dto";
import {SortParam} from "@/common/dto/request-params/sort-param";
import {QueryListResultDto} from "@/common/dto/result/query-list-result.dto";
import {Exam} from "@/entities/exam.entity";
import {ExamRepository} from "@/domain/exam/exam.repository";
import {CreateExamDto} from "@/domain/exam/dto/create-exam.dto";
import {ReadExamDto} from "@/domain/exam/dto/read-exam.dto";
import {UpdateExamDto} from "@/domain/exam/dto/update-exam.dto";

@Injectable()
export class ExamService extends TypeOrmCrudService<Exam> {

    constructor(
        @InjectMapper() private readonly mapper: Mapper,
        private readonly repository: ExamRepository,
    ) {
        super(repository);
    }

    async deleteById(id: number): Promise<Exam> {
        const criteria = {id: id};
        const exam = await this.repository.findOne({where: criteria});
        if (!exam) throw new RequestedInfoNotFoundException();
        return await this.repository.remove(exam);
    }

    async create(data: CreateExamDto): Promise<ReadExamDto> {
        const instance = this.mapper.map(data, CreateExamDto, Exam);
        const saveResult = await this.repository.save(instance);
        if (saveResult.id > 0)
            return this.mapper.map(saveResult, Exam, ReadExamDto);
        else throw new OperationNotSuccessfulException();
    }

    async update(
        id: number,
        data: UpdateExamDto,
    ): Promise<ReadExamDto> {
        const exam = await this.repository.findOne({
            where: {id: id},
        });

        if (!exam) throw new RequestedInfoNotFoundException();

        exam.examTitle = data.examTitle;
        exam.examTypeId = data.examTypeId;
        exam.duration = data.duration;
        exam.examHoldId = data.examHoldId;
        exam.fromDate = data.fromDate;
        exam.toDate = data.toDate;



        return this.mapper.map(
            await this.repository.save(exam),
            Exam,
            ReadExamDto,
        );

    }

    async getById(id: number): Promise<ReadExamDto> {
        const result = await this.repository.findById(id);
        if (!result) throw new RequestedInfoNotFoundException();
        return this.mapper.map(result, Exam, ReadExamDto);
    }

    async getAll(
        filterParam: any,
        sortParam: SortParam,
        page: number,
        pageLimit: number,
    ): Promise<QueryListResultDto<ReadExamDto>> {
        const [data, count] = await this.repository.getAll(
            filterParam,
            sortParam,
            page,
            pageLimit
        );

        return {
            total: count,
            data: this.mapper.mapArray(data, Exam, ReadExamDto),
        };
    }

}