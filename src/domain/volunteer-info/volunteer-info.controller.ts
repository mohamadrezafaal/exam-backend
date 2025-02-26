import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards,} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from '@/auth/guards/jwt-guard.guard';
import {VolunteerInfoService} from "@/domain/volunteer-info/volunteer-info.service";
import {VolunteerInfo} from "@/entities/volunteer-info.entity";
import {CreateVolunteerInfoDto} from "@/domain/volunteer-info/dto/create-volunteer-info.dto";
import {ReadVolunteerInfoDto} from "@/domain/volunteer-info/dto/read-volunteer-info.dto";
import {ApiQueryListResponse} from "@/common/decorators/swaager-api-response.decorator";
import {Pagination} from "@/common/decorators/pagination.decorator";
import {PageLimit} from "@/common/decorators/limit.decorator";
import {Filter} from "@/common/decorators/filter.decorator";
import {Sort} from "@/common/decorators/sort.decorator";
import {SortParam} from "@/common/dto/request-params/sort-param";
import {QueryListResultDto} from "@/common/dto/result/query-list-result.dto";
import {UpdateVolunteerInfoDto} from "@/domain/volunteer-info/dto/update-volunteer-info.dto";
import { Request, Response } from 'express';
import { OauthClientService } from '@/external-client/oauth-client/oauth-client.service';

@ApiTags('volunteer-info')
@Controller('volunteer-info')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('sso-auth')
export class VolunteerInfoController {
    constructor(
        private readonly service: VolunteerInfoService,
        private readonly oauthClientService: OauthClientService,


    ) {
    }

    @Post('volunteer')
    async findSpecificVolunteerAdvanced(@Res() res: Response, @Body() body, @PageLimit() pageLimit, @Sort() sort, @Pagination() page) {
        let result = await this.service.getAllWithFilter(body, page, pageLimit, sort);
        if (result) res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            message: 'Volunteer Finder Advanced',
            data: result,
        });
        else res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Volunteer Finder Advanced',
        });
    }

    @Get("volunteer/info/:nationalNo")
    async findSpecificVoluteer(@Res() res: Response, @Param("nationalNo") nationalNo:string, @Param("type") type) {
        var result;
        // if(type == '1') {
            result = await this.service.findSpecificVoluteerByNationalNumber(nationalNo);
        // } else {
        //     result = await this.personelFinderService.findSpecificPersonelByNationalNumber(code);
        // }
        if (result) res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            message: 'Volunteer Finder',
            data: result,
        });
        else res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Volunteer Finder',
        });
    }

    @Delete('/:id')
    async deleteById(@Param('id') id: number): Promise<VolunteerInfo> {
        return this.service.deleteById(id);
    }

    @Post()
    async create(@Body() data: CreateVolunteerInfoDto): Promise<ReadVolunteerInfoDto> {
        return this.service.create(data);
    }


    @Put('/:id')
    update(
        @Param('id') id: number,
        @Body() data: UpdateVolunteerInfoDto,
    ): Promise<ReadVolunteerInfoDto> {
        return this.service.update(id, data);
    }

    @Get('/get-all')
    @ApiQueryListResponse(ReadVolunteerInfoDto)
    getAll(
        @Pagination() page,
        @PageLimit() pageLimit,
        @Filter() filter,
        @Sort() sort: SortParam
    ): Promise<QueryListResultDto<ReadVolunteerInfoDto>> {
        return this.service.getAll(
            filter,
            sort,
            page,
            pageLimit
        );
    }

    @Get(':id')
    @ApiResponse({
        type: ReadVolunteerInfoDto,
    })
    async getById(@Param('id') id: number): Promise<ReadVolunteerInfoDto> {
        return this.service.getById(id);
    }

    @Get("volunteer/info/oauth/:nationalNo")
    async findSpecificVoluteerrrr(@Res() res: Response, @Param("nationalNo") nationalNo:string, @Param("type") type) {
        var result;
        // if(type == '1') {
            result = await this.oauthClientService.findSpecificVoluteerByNationalNumber(nationalNo);
        // } else {
        //     result = await this.personelFinderService.findSpecificPersonelByNationalNumber(code);
        // }
        if (result) res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            message: 'Volunteer Finder',
            data: result.data.data,
        });
        else res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Volunteer Finder',
        });
    }

}
