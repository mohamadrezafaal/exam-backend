import { ApiProperty } from '@nestjs/swagger';

export class ResultDto {
  @ApiProperty()
  status: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  success: boolean;
}
