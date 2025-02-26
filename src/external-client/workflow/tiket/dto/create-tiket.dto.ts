import { ApiProperty } from "@nestjs/swagger";
import {AutoMap} from '@automapper/classes';
import { FileOutput } from "./file-output.dto";

export class CreateTiketDto {
    @ApiProperty()
    tiketTypeId: number
    @ApiProperty()
    comment: string;
    @ApiProperty()
    personnelIdList: string[];
    @AutoMap()
    @ApiProperty({ type: [FileOutput] })
    files: any;


}

