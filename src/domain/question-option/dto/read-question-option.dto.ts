import {ApiProperty} from '@nestjs/swagger';
import {AutoMap} from '@automapper/classes';
import { ReadExamQuestionDto } from '@/domain/exam-question/dto/read-exam-question.dto';
import { ReadQuestionOptionAttachmentDto } from '@/domain/question-option/dto/read-quetion-option-attachment.dto';

export class ReadQuestionOptionDto {

    @ApiProperty()
    @AutoMap()
    id: number;

    @ApiProperty()
    @AutoMap()
    optionDesc: string;

    @ApiProperty()
    @AutoMap()
    order: number;

    @ApiProperty({type: () => ReadExamQuestionDto})
    @AutoMap(() => ReadExamQuestionDto)
    question: ReadExamQuestionDto;

    @AutoMap()
    @ApiProperty()
    attachments: ReadQuestionOptionAttachmentDto[];

}
