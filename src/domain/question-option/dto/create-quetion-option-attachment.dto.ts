import {AutoMap} from '@automapper/classes';
import {ApiProperty} from '@nestjs/swagger';

export class CreateQuestionOptionAttachmentDto {

    @AutoMap()
    @ApiProperty()
    fileName: string;

    @AutoMap()
    @ApiProperty()
    attachmentId: string;

}
