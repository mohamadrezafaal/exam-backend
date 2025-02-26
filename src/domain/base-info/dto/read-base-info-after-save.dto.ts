import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ReadBaseInfoItemDto } from '../../base-info-item/dto/read-base-info-item.dto';

export class ReadBaseInfoAfterSaveDto {
  @AutoMap()
  @ApiProperty({ required: false, readOnly: true })
  id: number;

  @AutoMap()
  @ApiProperty()
  systemId: number;

  @AutoMap()
  @ApiProperty()
  name: string;

  @AutoMap()
  @ApiProperty()
  isEditable!: boolean;
}
