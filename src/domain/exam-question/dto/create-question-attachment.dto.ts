import {AutoMap} from '@automapper/classes';
import {ApiProperty} from '@nestjs/swagger';

export class CreateQuestionAttachmentDto {

    @AutoMap()
    @ApiProperty()
    fileName: string;

    @AutoMap()
    @ApiProperty()
    attachmentId: string;

}
