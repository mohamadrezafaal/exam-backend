import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ReadBaseInfoItemDto } from '@/domain/base-info-item/dto/read-base-info-item.dto';
import { ReadGeographicalPlaceDto } from '@/domain/geographical-place/dto/read-geographical-place.dto';
import { ReadOrganDto } from '@/domain/organ/dto/read-organ.dto';
export class ReadOrganPropertyDto {
  @ApiProperty()
  @AutoMap()
  organId: number;
  @ApiProperty()
  @AutoMap()
  changeDate: number;
  @ApiProperty()
  @AutoMap()
  geographicalPlaceId: number;
  // @ApiProperty()
  // @AutoMap()
  // postTypeId: number;
  @ApiProperty()
  @AutoMap()
  deprivationDegreeId: number;
  @ApiProperty()
  @AutoMap()
  badWeatherDegreeId: number;
  @ApiProperty()
  @AutoMap()
  areaTypeId: number;
  @ApiProperty()
  @AutoMap()
  rowVersion: number;

  //   relations*

  @AutoMap(() => ReadGeographicalPlaceDto)
  @ApiProperty({ type: () => ReadGeographicalPlaceDto })
  geographicalPlace: ReadGeographicalPlaceDto;

  @AutoMap(() => ReadOrganDto)
  @ApiProperty({ type: () => ReadOrganDto })
  organ: ReadOrganDto;

  // @AutoMap(() => ReadPersonnelReportDto)
  // @ApiProperty({ type: () => ReadPersonnelReportDto })
  // post: ReadPersonnelReportDto;

  @AutoMap(() => ReadBaseInfoItemDto)
  @ApiProperty({ type: () => ReadBaseInfoItemDto })
  areaType: ReadBaseInfoItemDto;

  @AutoMap(() => ReadBaseInfoItemDto)
  @ApiProperty({ type: () => ReadBaseInfoItemDto })
  badWeatherDegree: ReadBaseInfoItemDto;

  @AutoMap(() => ReadBaseInfoItemDto)
  @ApiProperty({ type: () => ReadBaseInfoItemDto })
  deprivationDegree: ReadBaseInfoItemDto;
}
