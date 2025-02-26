import {AutoMap} from '@automapper/classes';
import {ApiProperty} from '@nestjs/swagger';

export class ReadQuestionAttachmentDto {

    @ApiProperty()
    @AutoMap()
    id: number;

    @AutoMap()
    @ApiProperty()
    questionId: number;

    @AutoMap()
    @ApiProperty()
    type: string;

    @AutoMap()
    @ApiProperty()
    fileName: string;

    @AutoMap()
    @ApiProperty()
    attachmentId: string;

}
