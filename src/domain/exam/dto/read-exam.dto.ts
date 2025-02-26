import {ApiProperty} from '@nestjs/swagger';
import {AutoMap} from '@automapper/classes';
import {ReadBaseInfoItemDto} from '../../base-info-item/dto/read-base-info-item.dto';

export class ReadExamDto {

    @ApiProperty()
    @AutoMap()
    id: number;

    @ApiProperty()
    @AutoMap()
    examTitle: string;

    @ApiProperty()
    @AutoMap()
    examTypeId: number;

    @AutoMap()
    @ApiProperty()
    examHoldId: number;

    @AutoMap()
    @ApiProperty()
    duration: number; 

    @AutoMap()
    @ApiProperty()
    fromDate: Date;

    @AutoMap()
    @ApiProperty()
    toDate: Date;

    @ApiProperty({type: () => ReadBaseInfoItemDto})
    @AutoMap(() => ReadBaseInfoItemDto)
    examType: ReadBaseInfoItemDto;

    @ApiProperty({type: () => ReadBaseInfoItemDto})
    @AutoMap(() => ReadBaseInfoItemDto)
    examHold: ReadBaseInfoItemDto;

}
