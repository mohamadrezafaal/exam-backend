import { ApiProperty } from "@nestjs/swagger";
import {AutoMap} from '@automapper/classes';

export class FileOutput {
    @AutoMap()
    @ApiProperty()
    documentId: string;
    @AutoMap()
    @ApiProperty()
    documentName: string;
    @AutoMap()
    @ApiProperty()
    documentTitle: string;
}


