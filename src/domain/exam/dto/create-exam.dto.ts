import {ApiProperty} from "@nestjs/swagger";
import {AutoMap} from "@automapper/classes";

export class CreateExamDto {

    @AutoMap()
    @ApiProperty()
    examTitle: string;

    @AutoMap()
    @ApiProperty()
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

}
