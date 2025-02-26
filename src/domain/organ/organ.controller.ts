import {JwtAuthGuard} from '@/auth/guards/jwt-guard.guard';
import {ApiQueryListResponse} from '@/common/decorators/swaager-api-response.decorator';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put, Query,
    UseGuards
} from '@nestjs/common';
import {ApiBearerAuth, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {CreateOrganOperationalDto} from '../organ-operational/dto/create-organ-operational.dto';
import {ReadOrganOperationalDto} from '../organ-operational/dto/read-organ-operational.dto';
import {CreateOrganPostDto} from '../organ-post/dto/create-organ-post.dto';
import {ReadOrganPostDto} from '../organ-post/dto/read-organ-post.dto';
import {CreateOrganDto} from './dto/create-organ.dto';
import {ReadOrganDto} from './dto/read-organ.dto';
import {OrganService} from './organ.service';
import {OrganPost} from '@/entities/organ-post.entity';
import {Organ} from '@/entities/organ.entity';
import {OrganOperational} from '@/entities/organ-operational.entity';
import {ReadTrainingUnitDto} from '@/domain/organ/dto/read-training-unit.dto';

@ApiTags('organ')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('sso-auth')
@Controller('organ')
export class OrganController {
    constructor(private readonly service: OrganService) {
    }

    @Get('/get-training-unit')
    @ApiQueryListResponse(ReadTrainingUnitDto)
    @ApiQuery({name: 'operationalIdList', required: false})
    @ApiQuery({name: 'checkUserOrganScope', required: false})
    async getTrainingUnitByOperationalType(
        @Query('operationalIdList') operationalIdList: string,
        @Query("checkUserOrganScope") checkUserOrganScope: boolean,
    ): Promise<ReadTrainingUnitDto[]> {
        return this.service.getTrainingUnitByOperationalType(operationalIdList, checkUserOrganScope);
    }

    @Get(':id')
    @ApiResponse({
        type: ReadOrganDto,
    })
    getById(@Param('id') id: number): Promise<ReadOrganDto> {
        return this.service.getById(id);
    }

    @Post()
    create(@Body() data: CreateOrganDto): Promise<ReadOrganDto> {
        return this.service.create(data);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body()
            data: CreateOrganDto,
    ): Promise<ReadOrganDto> {
        return await this.service.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<Organ> {
        return this.service.deleteById(id);
    }

    @Delete(':id/organ-post')
    async deletePostByOrganId(@Param('id') id: number): Promise<OrganPost> {
        return this.service.deletePostByOrganId(id);
    }

    @Delete(':id/organ-operational')
    async deleteOperationalsByOrganId(@Param('id') id: number): Promise<OrganOperational> {
        return this.service.deleteOperationalsByOrganId(id);
    }

    @Get(':id/organ-operational/operations')
    @ApiQueryListResponse(ReadOrganOperationalDto)
    async getAllByOrganId(@Param('id') id: number): Promise<ReadOrganOperationalDto> {
        return this.service.getAllOperationalByOrganId(id);
    }

    @Post(':id/organ-operational')
    createOperationalOrgan(@Body() data: CreateOrganOperationalDto): Promise<ReadOrganOperationalDto> {
        return this.service.createOperationalOrgan(data);
    }

    @Put(':id/organ-operational')
    async updateOperationalOrgan(
        @Param('id') id: number,
        @Body()
            data: CreateOrganOperationalDto,
    ): Promise<ReadOrganDto> {
        return await this.service.updateOperationalOrgan(id, data);
    }

    @Get('/:id/organ-post/posts')
    @ApiQueryListResponse(ReadOrganPostDto)
    async getAllPostByOrganId(@Param('id') id: number): Promise<ReadOrganPostDto> {
        return this.service.getAllPostByOrganId(id);
    }

    @Post(':id/organ-post')
    createPost(@Body() data: CreateOrganPostDto): Promise<ReadOrganPostDto> {
        return this.service.createPost(data);
    }

    @Put(':id/organ-post')
    async updatePost(
        @Param('id') id: number,
        @Body()
            data: CreateOrganPostDto,
    ): Promise<ReadOrganDto> {
        return await this.service.updatePost(id, data);
    }


}
