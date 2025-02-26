import {ApiProperty} from "@nestjs/swagger";
import {AutoMap} from "@automapper/classes";
import { CreateQuestionOptionAttachmentDto } from "@/domain/question-option/dto/create-quetion-option-attachment.dto";
import { IsOptional } from "class-validator";

export class CreateQuestionOptionDto {

    @AutoMap()
    @ApiProperty()
    optionDesc: string;

    @AutoMap()
    @ApiProperty()
    order: number;

    // @AutoMap()
    // @ApiProperty()
    // questionId: number;

    @AutoMap()
    @ApiProperty({type: [CreateQuestionOptionAttachmentDto]})
    @IsOptional()
    attachments: CreateQuestionOptionAttachmentDto[];

}
