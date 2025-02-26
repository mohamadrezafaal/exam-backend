import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBaseInfoItemDto {
    @AutoMap()
    @ApiProperty()
    baseInfoId: number;

    @AutoMap()
    @ApiProperty()
    @IsNumber()
    code: number;

    @AutoMap()
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @AutoMap()
    @ApiProperty()
    isActive: boolean;
}
