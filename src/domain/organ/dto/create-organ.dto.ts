import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganDto {
  @ApiProperty()
  @AutoMap()
  parentId: number;
  @ApiProperty()
  @AutoMap()
  organTypeId: number;
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
  title: string;
  @ApiProperty()
  @AutoMap()
  paragraphNumber: string;
  @ApiProperty()
  @AutoMap()
  forceId: number;
  @ApiProperty()
  @AutoMap()
  organCode: string;
  @ApiProperty()
  @AutoMap()
  deactivateDate: boolean;
  @ApiProperty()
  @AutoMap()
  organAddress: string;
  @AutoMap()
  @ApiProperty()
  telephoneNumber: string;

}
