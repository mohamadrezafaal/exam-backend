import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { ReadBaseInfoItemDto } from "@/domain/base-info-item/dto/read-base-info-item.dto";
import { ReadOrganDto } from "@/domain/organ/dto/read-organ.dto";

export class ReadOrganOperationalDto {
  @ApiProperty()
  @AutoMap()
  organId: number;
  @ApiProperty()
  @AutoMap()
  operationalId: number;
  //   relations*

  @AutoMap(() => ReadBaseInfoItemDto)
  @ApiProperty({ type: () => ReadBaseInfoItemDto })
  operational: ReadBaseInfoItemDto;

  @AutoMap(() => ReadOrganDto)
  @ApiProperty({ type: () => ReadOrganDto })
  organ: ReadOrganDto;
}
