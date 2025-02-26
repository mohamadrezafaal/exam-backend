import {AutoMap} from '@automapper/classes';
import {ApiProperty} from '@nestjs/swagger';

export class CreateDocumentDto {

    @AutoMap()
    @ApiProperty()
    // title: string;
    documentTitle: string;

    @AutoMap()
    @ApiProperty()
    // name: string;
    documentName: string;

    @AutoMap()
    @ApiProperty()
    // streamID: string;
    documentId: string;

}
