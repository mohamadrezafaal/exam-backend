import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ReadBaseInfoItemDto } from '../../base-info-item/dto/read-base-info-item.dto';

export class ReadGeographicalPlaceDto {
    @AutoMap()
    @ApiProperty({ required: false, readOnly: true })
    id: number;

    @AutoMap()
    @ApiProperty()
    title: string;

    @AutoMap()
    @ApiProperty()
    parentId!: number;

    @AutoMap()
    @ApiProperty()
    typeId!: number;

    @AutoMap()
    @ApiProperty()
    itemCode: string;

    @AutoMap()
    @ApiProperty()
    baseCode: string;

    @AutoMap()
    @ApiProperty()
    leftId: number;

    @AutoMap()
    @ApiProperty()
    rightId: number;

    @AutoMap()
    @ApiProperty()
    levelNumber: number;

    @AutoMap()
    @ApiProperty()
    isParent: boolean;

    @AutoMap(() => ReadBaseInfoItemDto)
    @ApiProperty({ type: () => ReadBaseInfoItemDto })
    type!: ReadBaseInfoItemDto;

    @AutoMap(() => ReadGeographicalPlaceDto)
    @ApiProperty({ type: () => ReadGeographicalPlaceDto })
    parent!: ReadGeographicalPlaceDto;
}
