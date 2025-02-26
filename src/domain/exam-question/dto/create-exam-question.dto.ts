import {ApiProperty} from "@nestjs/swagger";
import {AutoMap} from "@automapper/classes";
import { CreateQuestionAttachmentDto } from "@/domain/exam-question/dto/create-question-attachment.dto";
import { IsOptional } from "class-validator";
import { CreateQuestionOptionDto } from "@/domain/question-option/dto/create-question-option.dto";

export class CreateExamQuestionDto  {

    @AutoMap()
    @ApiProperty()
    questionTitle: string;

    @AutoMap()
    @ApiProperty()
    order: number;

    @AutoMap()
    @ApiProperty()
    examId: number;

    @AutoMap()
    @ApiProperty()
    isDescriptive: boolean;

    @AutoMap()
    @ApiProperty({type: [CreateQuestionAttachmentDto]})
    @IsOptional()
    attachments: CreateQuestionAttachmentDto[];

    @AutoMap()
    @ApiProperty({type: [CreateQuestionOptionDto]})
    @IsOptional()
    options: CreateQuestionOptionDto[];
    
}
