import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ReadBaseInfoItemDto } from '@/domain/base-info-item/dto/read-base-info-item.dto';
import { ReadOrganDto } from '@/domain/organ/dto/read-organ.dto';
// import { ReadPostDto } from '@/domain/post/dto/read-post.dto';
export class ReadOrganPostDto {
  @ApiProperty()
  @AutoMap()
  organId: number;
  @ApiProperty()
  @AutoMap()
  postId: number;
  @ApiProperty()
  @AutoMap()
  priority: number;
  @ApiProperty()
  @AutoMap()
  postTypeId: number;

  //   relations*

  @AutoMap(() => ReadBaseInfoItemDto)
  @ApiProperty({ type: () => ReadBaseInfoItemDto })
  postType: ReadBaseInfoItemDto;

  @AutoMap(() => ReadOrganDto)
  @ApiProperty({ type: () => ReadOrganDto })
  organ: ReadOrganDto;

  // @AutoMap(() => ReadPostDto)
  // @ApiProperty({ type: () => ReadPostDto })
  // post: ReadPostDto;
}
