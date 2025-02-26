import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
export class CreateOrganOperationalDto {
  @ApiProperty()
  @AutoMap()
  organId: number;
  @ApiProperty()
  @AutoMap()
  operationalId: number;
}
