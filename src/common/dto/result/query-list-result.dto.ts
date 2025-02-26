import { ApiProperty } from '@nestjs/swagger';

export class QueryListResultDto<T> {
  @ApiProperty()
  total: number;
  data: T[];
}
