import {
  Controller,
  Get,
  Res,
  UseGuards, HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-guard.guard';
import { PayrollService } from './payroll.service';

@Controller('payroll')
@ApiTags('payroll')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('sso-auth')
export class PayrollController {
  constructor(private service: PayrollService) {}


  @Get('last-payroll')
  async getLastPayroll(@Res() res: Response) {
    const result:any=await this.service.getLastPayroll();
    return res.status(HttpStatus.OK).json(result.data);
  }


}