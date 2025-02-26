import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBaseInfoDto {
  @AutoMap()
  @ApiProperty()
  systemId!: number;

  @AutoMap()
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @AutoMap()
  @ApiProperty()
  isEditable!: boolean;
}
