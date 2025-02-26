import { HttpClientService } from '@/http-client/http-client.service';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ExportOption } from './dto/ExportOption';

@Injectable()
export class ExcelService {
  constructor(
    protected httpService: HttpClientService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async exportExcel(body: any) {
    return this.httpService.post(`${process.env.Excel_BACKEND}/excel/`, body,{
      responseType: 'arraybuffer',
    });
  }
}
