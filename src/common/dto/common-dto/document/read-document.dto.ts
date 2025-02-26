import {ApiProperty} from '@nestjs/swagger';
import {AutoMap} from '@automapper/classes';

export class ReadDocumentDto {

    @ApiProperty()
    @AutoMap()
    id: number;

    @ApiProperty()
    @AutoMap()
    documentId: string;

    @ApiProperty()
    @AutoMap()
    documentTitle: string;

    @ApiProperty()
    @AutoMap()
    documentName: string;

}
