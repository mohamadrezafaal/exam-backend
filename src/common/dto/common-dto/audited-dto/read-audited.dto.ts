import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ReadBaseDto } from '../base-dto/read-base.dto';

export class ReadAuditedDto extends ReadBaseDto {
  @AutoMap() @ApiProperty() createdDate: Date;

  @AutoMap() @ApiProperty() createdBy: number;

  @AutoMap() @ApiProperty() modifiedDate: Date;

  @AutoMap() @ApiProperty() modifiedBy: number;
}
