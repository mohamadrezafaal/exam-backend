import { ApiProperty } from '@nestjs/swagger';

export class ExportOptionColumn {
  @ApiProperty()
  header: string;
  @ApiProperty()
  key: string;
}
