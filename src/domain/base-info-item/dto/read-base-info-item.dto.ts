import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ReadBaseInfoItemDto {
    @AutoMap()
    @ApiProperty({ required: false, readOnly: true })
    id: number;

    @AutoMap()
    @ApiProperty()
    code: number;

    @AutoMap()
    @ApiProperty()
    name: string;

    @AutoMap()
    @ApiProperty()
    isActive: boolean;

    @AutoMap()
    @ApiProperty()
    baseInfoId: number;
}
