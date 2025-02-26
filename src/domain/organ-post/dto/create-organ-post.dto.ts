import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
export class CreateOrganPostDto {
  // @ApiProperty()
  // @AutoMap()
  // organId: number;
  @ApiProperty({ required: true })
  @AutoMap()
  postId: number;
  @ApiProperty({ required: true })
  @AutoMap()
  priority: number;
  @ApiProperty({ required: false })
  @AutoMap()
  postTypeId: number;
}
