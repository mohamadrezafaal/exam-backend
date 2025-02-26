import { ApiProperty } from '@nestjs/swagger';

export class ReadTrainingUnitDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;
}