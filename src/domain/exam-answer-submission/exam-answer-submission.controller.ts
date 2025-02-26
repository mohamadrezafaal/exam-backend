import { JwtAuthGuard } from '@/auth/guards/jwt-guard.guard';
import { Filter } from '@/common/decorators/filter.decorator';
import { PageLimit } from '@/common/decorators/limit.decorator';
import { Pagination } from '@/common/decorators/pagination.decorator';
import { Sort } from '@/common/decorators/sort.decorator';
import { ApiQueryListResponse } from '@/common/decorators/swaager-api-response.decorator';
import { SortParam } from '@/common/dto/request-params/sort-param';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { AnswerSubmission } from '@/entities/exam-answer-submission.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateAnswerSubmissionDto } from './dto/create-exam-answer-submission.dto';
import { ReadAnswerSubmissionDto } from './dto/read-exam-answer-submission.dto';
import { UpdateAnswerSubmissionDto } from './dto/update-exam-answer-submission.dto';
import { AnswerSubmissionService } from './exam-answer-submission.service';

@ApiTags('exam-answer-submission')
@Controller('exam-answer-submission')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('sso-auth')
export class AnswerSubmissionController {
  constructor(private readonly service: AnswerSubmissionService) {}

  @Delete('/:id')
  async deleteById(@Param('id') id: number): Promise<AnswerSubmission> {
    return this.service.deleteById(id);
  }

  @Post()
  async create(
    @Body() data: CreateAnswerSubmissionDto,
  ): Promise<ReadAnswerSubmissionDto> {
    return this.service.create(data);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() data: UpdateAnswerSubmissionDto,
  ): Promise<ReadAnswerSubmissionDto> {
    return this.service.update(id, data);
  }

  @Get('/get-all')
  @ApiQueryListResponse(ReadAnswerSubmissionDto)
  getAll(
    @Pagination() page,
    @PageLimit() pageLimit,
    @Filter() filter,
    @Sort() sort: SortParam,
  ): Promise<QueryListResultDto<ReadAnswerSubmissionDto>> {
    return this.service.getAll(filter, sort, page, pageLimit);
  }

  @Get(':id')
  @ApiResponse({
    type: ReadAnswerSubmissionDto,
  })
  async getById(@Param('id') id: number): Promise<ReadAnswerSubmissionDto> {
    return this.service.getById(id);
  }
}
