import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
export class CreateOrganPropertyDto {
  @ApiProperty({required:false})
  @AutoMap()
  organId: number;
  @ApiProperty({required:true})
  @AutoMap()
  changeDate: Date;
  @ApiProperty({required:true})
  @AutoMap()
  geographicalPlaceId: number;
  // @ApiProperty()
  // @AutoMap()
  // postTypeId: number;
  @ApiProperty()
  @AutoMap()
  deprivationDegreeId: number;
  @ApiProperty({required:true})
  @AutoMap()
  badWeatherDegreeId: number;
  @ApiProperty({required:true})
  @AutoMap()
  areaTypeId: number;
  // @ApiProperty({required:false})
  // @AutoMap()
  // rowVersion: Uint8Array;
}
