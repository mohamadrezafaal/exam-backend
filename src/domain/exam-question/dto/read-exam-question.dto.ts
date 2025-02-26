import {ApiProperty} from '@nestjs/swagger';
import {AutoMap} from '@automapper/classes';
import {ReadExamDto} from "@/domain/exam/dto/read-exam.dto";
import { ReadQuestionAttachmentDto } from '@/domain/exam-question/dto/read-question-attachment.dto';
import { ReadQuestionOptionDto } from '@/domain/question-option/dto/read-question-option.dto';

export class ReadExamQuestionDto {

    @ApiProperty()
    @AutoMap()
    id: number;

    @ApiProperty()
    @AutoMap()
    questionTitle: string;

    @ApiProperty()
    @AutoMap()
    order: number;


    @ApiProperty({type: () => ReadExamDto})
    @AutoMap(() => ReadExamDto)
    exam: ReadExamDto;

    @AutoMap()
    @ApiProperty({type: [ReadQuestionAttachmentDto]})
    attachments: ReadQuestionAttachmentDto[];

    @AutoMap()
    @ApiProperty({type: [ReadQuestionOptionDto]})
    options: ReadQuestionOptionDto[];

}
