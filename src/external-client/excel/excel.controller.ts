import { JwtAuthGuard } from '@/auth/guards/jwt-guard.guard';
import {
    BadRequestException,
    Body,
    Controller,
    HttpStatus,
    Post,
    Res,
    UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ExportOption } from './dto/ExportOption';
import { ExcelService } from './excel.service';
import { json } from 'sequelize';

@Controller('excel')
@ApiTags('excel')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('sso-auth')
export class ExcelController {
  constructor(private service: ExcelService) {}

  @Post()
  async exportExcel(@Body() option: any, @Res() res: Response) {
    const allStatus: any = await this.service.exportExcel(option);
    if (!allStatus.data) throw new BadRequestException('خروجی اکسل ناموفق بود');
    const buffer:any = Buffer.from(allStatus.data,'binary')
     return res.set('Content-Disposition', 'attachment; filename=example.xlsx').send(buffer);
  }
}
