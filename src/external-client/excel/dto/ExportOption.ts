import { ApiProperty } from '@nestjs/swagger';
import { ExportOptionColumn } from './ExportOptionColumn';

export class ExportOption {
  @ApiProperty()
  data: any;
  @ApiProperty({ type: [ExportOptionColumn] })
  columns: ExportOptionColumn[];
}
