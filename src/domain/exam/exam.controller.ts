import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards,} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from '@/auth/guards/jwt-guard.guard';
import {ApiQueryListResponse} from "@/common/decorators/swaager-api-response.decorator";
import {Pagination} from "@/common/decorators/pagination.decorator";
import {PageLimit} from "@/common/decorators/limit.decorator";
import {Filter} from "@/common/decorators/filter.decorator";
import {Sort} from "@/common/decorators/sort.decorator";
import {SortParam} from "@/common/dto/request-params/sort-param";
import {QueryListResultDto} from "@/common/dto/result/query-list-result.dto";
import {ExamService} from "@/domain/exam/exam.service";
import {Exam} from "@/entities/exam.entity";
import {ReadExamDto} from "@/domain/exam/dto/read-exam.dto";
import {CreateExamDto} from "@/domain/exam/dto/create-exam.dto";
import {UpdateExamDto} from "@/domain/exam/dto/update-exam.dto";

@ApiTags('exam')
@Controller('exam')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('sso-auth')
export class ExamController {
    constructor(private readonly service: ExamService) {
    }

    @Delete('/:id')
    async deleteById(@Param('id') id: number): Promise<Exam> {
        return this.service.deleteById(id);
    }

    @Post()
    async create(@Body() data: CreateExamDto): Promise<ReadExamDto> {
        return this.service.create(data);
    }


    @Put('/:id')
    update(
        @Param('id') id: number,
        @Body() data: UpdateExamDto,
    ): Promise<ReadExamDto> {
        return this.service.update(id, data);
    }

    @Get('/get-all')
    @ApiQueryListResponse(ReadExamDto)
    getAll(
        @Pagination() page,
        @PageLimit() pageLimit,
        @Filter() filter,
        @Sort() sort: SortParam
    ): Promise<QueryListResultDto<ReadExamDto>> {
        return this.service.getAll(
            filter,
            sort,
            page,
            pageLimit
        );
    }

    @Get(':id')
    @ApiResponse({
        type: ReadExamDto,
    })
    async getById(@Param('id') id: number): Promise<ReadExamDto> {
        return this.service.getById(id);
    }


}
