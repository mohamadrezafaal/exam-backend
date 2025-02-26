import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { BaseInfoItemService } from './base-info-item.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Filter } from '@/common/decorators/filter.decorator';
import { Sort } from '@/common/decorators/sort.decorator';
import { QueryListResultDto } from '@/common/dto/result/query-list-result.dto';
import { ReadBaseInfoItemDto } from './dto/read-base-info-item.dto';
import { CreateBaseInfoItemDto } from './dto/create-base-info-item.dto';
import { ApiCommandResponse, ApiQueryListResponse } from '@/common/decorators/swaager-api-response.decorator';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from '@/auth/guards/jwt-guard.guard';
import { BaseInfoItem } from '@/entities/base-info-item.entity';
import { HttpCacheInterceptor } from '@/common/interceptors/HttpCacheInterceptor';

@Controller('base-info-item')
@ApiTags('base-info-item')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('sso-auth')
@UseInterceptors(HttpCacheInterceptor)
export class BaseInfoItemController {
  constructor(private readonly service: BaseInfoItemService) {}

  @Get('/get-all/:baseInfoId')
  @ApiQueryListResponse(ReadBaseInfoItemDto)
  @ApiQuery({name:'page',required:false})
  @ApiQuery({name:'limit',required:false})
  async getAll(
    @Query('page') _page:number  ,
    @Query('limit') _limit:number ,
    @Filter() filter,
    @Sort() sort,
    @Param('baseInfoId') baseInfoId: number,
  ): Promise<QueryListResultDto<ReadBaseInfoItemDto>> {
    return this.service.getAll(filter, sort, _page, _limit, baseInfoId);
  }

  @Get('/get-custom')
  @ApiQueryListResponse(ReadBaseInfoItemDto)
  @ApiQuery({name:'baseInfoId',required:false})
  async getCustombaseId(
    @Filter() filter,
  ): Promise<QueryListResultDto<ReadBaseInfoItemDto>> {
    return this.service.getCustombaseId(filter);
  }


  @Post()
  @ApiCommandResponse(ReadBaseInfoItemDto)
  create(@Body() data: CreateBaseInfoItemDto): Promise<ReadBaseInfoItemDto> {
    return this.service.create(data);
  }

  @Patch(':id')
  @ApiCommandResponse(ReadBaseInfoItemDto)
  async update(
    @Param('id') id: number,
    @Body()
    data: CreateBaseInfoItemDto,
  ): Promise<ReadBaseInfoItemDto> {
    return await this.service.update(id, data);
  }

  @Delete(':id')
  @ApiCommandResponse(DeleteResult)
  async delete(@Param('id') id: number): Promise<BaseInfoItem> {
    return this.service.deleteById(id);
  }

  @Get('/get-citations/:systemProcessId')
  async getCitations(@Param('systemProcessId') systemProcessId: number) {
    return this.service.getCitations(systemProcessId);
  }
}
