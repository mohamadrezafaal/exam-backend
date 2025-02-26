import { JwtAuthGuard } from '@/auth/guards/jwt-guard.guard';
import { Filter } from '@/common/decorators/filter.decorator';
import { PageLimit } from '@/common/decorators/limit.decorator';
import { Pagination } from '@/common/decorators/pagination.decorator';
import { Sort } from '@/common/decorators/sort.decorator';
import { SortParam } from '@/common/dto/request-params/sort-param';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { Request, Response } from 'express';
import { CloseTiketDto } from './dto/close-tiket.dto';
import { CreateTiketDto } from './dto/create-tiket.dto';
import { UpdateTiketDto } from './dto/update-tiket.dto';
import { TiketService } from './tiket.service';
import { StartTiketDto } from './dto/start-tiket.dto';

@Controller('workflow/tiket')
@ApiTags('tiket')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('sso-auth')
export class TiketController {
  constructor(private service: TiketService) { }

  @Get('system/tiket')
  async getSystemTiket(@Res() res: Response) {
    const allStatus: any = await this.service.getSystemTiket(
      process.env.SYSTEM_ID,

    );
    return res.status(HttpStatus.OK).json(allStatus.data);
  }

  @Get('one/:tiketId')
  async getTiket(@Param('tiketId') tiketId: number, @Res() res: Response) {
    const data = await this.service.getTiket(tiketId)
    return res.status(HttpStatus.OK).json(data.data);
  }

  @Get('attachment/:tiketId')
  async getTiketAttachments(
    @Res() res: Response,
    @Param('tiketId') tiketId: number,
  ) {
    const allStatus: any = await this.service.getTiketAttachment(tiketId);
    return res.status(HttpStatus.OK).json(allStatus.data);
  }

  @Get('userTiket/cartable')
  async getUserTiketCartable(
    @Pagination() page,
    @PageLimit() pageLimit,
    @Filter() filter,
    @Sort() sort,
    @Res() res: any,
  ) {
    const allStatus: any = await this.service.getUserTiketCartable(
      process.env.SYSTEM_ID,

    );
    return res.status(HttpStatus.OK).json(allStatus.data);
  }

  @Post('create/tiket')
  async createTiket(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateTiketDto,
  ) {
    let promise: any = await this.service.createTiket(body);
    return res.status(HttpStatus.OK).json(promise.data);
  }

  @Put('update')
  async updateTiket(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: UpdateTiketDto,
  ) {
    let promise = await this.service.updateTiket(body);
    return res.status(HttpStatus.OK).json(promise.data);
  }

  @Delete('delete/:tiketId')
  async deleteTiket(
    @Res() res: Response,
    @Param('tiketId') tiketId: number,
  ) {
    const allStatus: any = await this.service.deleteTiket(tiketId);
    return res.status(HttpStatus.OK).json(allStatus.data);
  }

  @Delete('attachment/:documentId')
  async deleteTiketAttachments(
    @Res() res: Response,
    @Param('documentId') documentId: UUID,
  ) {
    const allStatus: any = await this.service.deleteTiketAttachment(documentId)
    return res.status(HttpStatus.OK).json(allStatus.data);
  }

  @Post('close/tiket')
  async closeTiket(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CloseTiketDto,
  ) {
    let promise: any = await this.service.closeTiket(body);
    return res.status(HttpStatus.OK).json(promise.data);
  }

  @Post('send/start')
  async sendTiket(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: StartTiketDto,
  ) {
    let promise: any = await this.service.sendTiket(body);
    if(body.reciverOrganId && body.reciverPostId){
    return res.status(HttpStatus.OK).json(promise.data);
    }
    else{
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'سازمان و پست را انتخاب نمایید',
        data: null,
      });
    }
  }

  @Get('all')
  async getAllTikets(
    @Res() res: Response,
    @Pagination() page,
    @PageLimit() pageLimit,
    @Filter() filter,
    @Sort() sort: SortParam,
  ) {
    const allStatus: any = await this.service.getAllTikets(
      process.env.SYSTEM_ID,
    );
    return res.status(HttpStatus.OK).json(allStatus.data);

  }

  @Get('task/detail/:tiketId')
  async getTiketDetail(
    @Res() res: Response,
    @Param('tiketId') tiketId,
  ) {
    const allStatus:any=await this.service.getTiketDetail(tiketId);
    return res.status(HttpStatus.OK).json(allStatus.data);
  }

}
