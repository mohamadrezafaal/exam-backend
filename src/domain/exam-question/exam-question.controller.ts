import {Body, Controller, Delete, Param, Post, Put, Get, UseGuards,} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from '@/auth/guards/jwt-guard.guard';
import {ExamQuestionService} from "@/domain/exam-question/exam-question.service";
import {Question} from "@/entities/question.entity";
import {ReadExamQuestionDto} from "@/domain/exam-question/dto/read-exam-question.dto";
import {CreateExamQuestionDto} from "@/domain/exam-question/dto/create-exam-question.dto";
import { UpdateExamQuestionDto } from '@/domain/exam-question/dto/update-exam-question.dto';
import { ApiQueryListResponse } from '@/common/decorators/swaager-api-response.decorator';
import { Pagination } from '@/common/decorators/pagination.decorator';
import { PageLimit } from '@/common/decorators/limit.decorator';
import { Filter } from '@/common/decorators/filter.decorator';
import { Sort } from '@/common/decorators/sort.decorator';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { SortParam } from '@/common/dto/request-params/sort-param';

@ApiTags('exam-question')
@Controller('exam-question')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('sso-auth')
export class ExamQuestionController {
    constructor(private readonly service: ExamQuestionService) {
    }

    @Delete('/:id')
    async deleteById(@Param('id') id: number): Promise<Question> {
        return this.service.deleteById(id);
    }

    @Post()
    async create(@Body() data: CreateExamQuestionDto): Promise<ReadExamQuestionDto> {
        return this.service.create(data);
    }

    @Put('/:id')
    update(
        @Param('id') id: number,
        @Body() data: UpdateExamQuestionDto,
    ): Promise<ReadExamQuestionDto> {
        return this.service.update(id, data);
    }
    
    @Get('/get-all')
    @ApiQueryListResponse(ReadExamQuestionDto)
    getAll(
        @Pagination() page,
        @PageLimit() pageLimit,
        @Filter() filter,
        @Sort() sort: SortParam
    ): Promise<QueryListResultDto<ReadExamQuestionDto>> {
        return this.service.getAll(
            filter,
            sort,
            page,
            pageLimit
        );
    }
    
    @Get(':id')
    @ApiResponse({
        type: ReadExamQuestionDto,
    })
    async getById(@Param('id') id: number): Promise<ReadExamQuestionDto> {
        return this.service.getById(id);
    }

}
