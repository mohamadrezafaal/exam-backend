import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ReadBaseInfoItemDto } from '@/domain/base-info-item/dto/read-base-info-item.dto';

export class ReadBaseInfoDto {
  @AutoMap()
  @ApiProperty({ required: false, readOnly: true })
  id: number;

  @AutoMap()
  @ApiProperty()
  systemId: number;

  @AutoMap()
  @ApiProperty()
  name: string;

  @AutoMap(() => [ReadBaseInfoItemDto])
  @ApiProperty({ type: () => [ReadBaseInfoItemDto] })
  items: ReadBaseInfoItemDto[];

  @AutoMap()
  @ApiProperty()
  isEditable!: boolean;
}
