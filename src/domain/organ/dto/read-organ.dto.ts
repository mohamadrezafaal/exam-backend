import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ReadBaseInfoItemDto } from '@/domain/base-info-item/dto/read-base-info-item.dto';
export class ReadOrganDto {
  @ApiProperty()
  @AutoMap()
  organTypeId: number;
  @ApiProperty()
  @AutoMap()
  id: number;
  @ApiProperty()
  @AutoMap()
  leftId: number;
  @ApiProperty()
  @AutoMap()
  rightId: number;
  @ApiProperty()
  @AutoMap()
  levelNumber: number;
  @ApiProperty()
  @AutoMap()
  serialNumber: string;
  @ApiProperty()
  @AutoMap()
  paragraphNumber: string;
  @ApiProperty()
  @AutoMap()
  forceId: number;
  @ApiProperty()
  @AutoMap()
  deactivateDate: Date;
  @ApiProperty()
  @AutoMap()
  title: string;
  @ApiProperty()
  @AutoMap()
  organCode: string;
  @ApiProperty()
  @AutoMap()
  organAddress: string;
  @ApiProperty()
  @AutoMap()
  telephoneNumber: string;
  //   relations*

  @AutoMap(() => ReadBaseInfoItemDto)
  @ApiProperty({ type: () => ReadBaseInfoItemDto })
  organType: ReadBaseInfoItemDto;

  @AutoMap(() => ReadBaseInfoItemDto)
  @ApiProperty({ type: () => ReadBaseInfoItemDto })
  force: ReadBaseInfoItemDto;

  @AutoMap(() => ReadOrganDto)
  @ApiProperty({ type: () => ReadOrganDto })
  parent: ReadOrganDto;
}
