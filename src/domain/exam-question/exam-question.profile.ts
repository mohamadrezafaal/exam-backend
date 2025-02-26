import {createMap, forMember, Mapper, mapWith,} from '@automapper/core';
import {AutomapperProfile, InjectMapper} from '@automapper/nestjs';
import {Injectable} from '@nestjs/common';
import {Question} from "@/entities/question.entity";
import {ReadExamQuestionDto} from "@/domain/exam-question/dto/read-exam-question.dto";
import {CreateExamQuestionDto} from "@/domain/exam-question/dto/create-exam-question.dto";
import { QuestionAttachment } from '@/entities/question-attachment.entity';
import { CreateQuestionAttachmentDto } from '@/domain/exam-question/dto/create-question-attachment.dto';
import { ReadQuestionAttachmentDto } from '@/domain/exam-question/dto/read-question-attachment.dto';
import { QuestionOption } from '@/entities/question-option.entity';
import { ReadQuestionOptionDto } from '@/domain/question-option/dto/read-question-option.dto';
import { CreateQuestionOptionDto } from '../question-option/dto/create-question-option.dto';

@Injectable()
export class ExamQuestionProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(
                    mapper,
                    CreateExamQuestionDto, 
                    Question,
                    forMember(
                        (d) => d.attachments,
                        mapWith(QuestionAttachment, CreateQuestionAttachmentDto, (s) => s.attachments)
                    ),
                    forMember(
                        (d) => d.options,
                        mapWith(QuestionOption, CreateQuestionOptionDto, (s) => s.options)
                    )
                );
            createMap(mapper, ReadExamQuestionDto, Question);
            createMap(mapper, Question, ReadExamQuestionDto,
                forMember(
                    (d) => d.attachments,
                    mapWith(QuestionAttachment, ReadQuestionAttachmentDto, (s) => s.attachments)
                ),
                forMember(
                    (d) => d.options,
                    mapWith(QuestionOption, ReadQuestionOptionDto, (s) => s.options)
                )
                );
            createMap(mapper, ReadQuestionAttachmentDto, QuestionAttachment);
            createMap(mapper, QuestionAttachment, ReadQuestionAttachmentDto);
            createMap(mapper, CreateQuestionAttachmentDto, QuestionAttachment);
        };
    }
}
