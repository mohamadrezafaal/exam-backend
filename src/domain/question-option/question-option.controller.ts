import {Body, Controller, Delete, Param, Post, UseGuards, Put, Get} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from '@/auth/guards/jwt-guard.guard';
import { QuestionOptionService } from '@/domain/question-option/question-option.service';
import { CreateQuestionOptionDto } from '@/domain/question-option/dto/create-question-option.dto';
import { ReadQuestionOptionDto } from '@/domain/question-option/dto/read-question-option.dto';
import { QuestionOption } from '@/entities/question-option.entity';
import { UpdateQuestionOptionDto } from '@/domain/question-option/dto/update-question-option.dto';
import { ApiQueryListResponse } from '@/common/decorators/swaager-api-response.decorator';
import { Pagination } from '@/common/decorators/pagination.decorator';
import { PageLimit } from '@/common/decorators/limit.decorator';
import { Filter } from '@/common/decorators/filter.decorator';
import { Sort } from '@/common/decorators/sort.decorator';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';

@ApiTags('question-option')
@Controller('question-option')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('sso-auth')
export class QuestionOptionController {
    constructor(private readonly service: QuestionOptionService) {
    }

    @Delete('/:id')
    async deleteById(@Param('id') id: number): Promise<QuestionOption> {
        return this.service.deleteById(id);
    }

    @Post()
    async create(@Body() data: CreateQuestionOptionDto): Promise<ReadQuestionOptionDto> {
        return this.service.create(data);
    }

    @Put('/:id')
    update(
        @Param('id') id: number,
        @Body() data: UpdateQuestionOptionDto,
    ): Promise<ReadQuestionOptionDto> {
        return this.service.update(id, data);
    }

    @Get('/get-all/:questionId')
    @ApiQueryListResponse(ReadQuestionOptionDto)
    getAll(
        @Pagination() page,
        @PageLimit() pageLimit,
        @Param('questionId') questionId:number,
        @Filter() filter,
        @Sort() sort: SortParam
    ): Promise<QueryListResultDto<ReadQuestionOptionDto>> {
        return this.service.getAll(
            filter,
            sort,
            page,
            pageLimit,
            questionId
        );
    }

    @Get(':id')
    @ApiResponse({
        type: ReadQuestionOptionDto,
    })
    async getById(@Param('id') id: number): Promise<ReadQuestionOptionDto> {
        return this.service.getById(id);
    }

}