import { Module } from '@nestjs/common';

import { HttpClientModule } from '@/http-client/http-client.module';
import { HttpClientService } from '@/http-client/http-client.service';
import { ExcelController } from './excel.controller';
import { ExcelService } from './excel.service';

@Module({
  imports: [HttpClientModule],
  controllers: [ExcelController],
  providers: [ExcelService, HttpClientService],
  exports: [ExcelService],
})
export class ExcelModule {}
