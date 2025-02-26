import {createMap, forMember, Mapper, mapWith,} from '@automapper/core';
import {AutomapperProfile, InjectMapper} from '@automapper/nestjs';
import {Injectable} from '@nestjs/common';
import { CreateQuestionOptionDto } from '@/domain/question-option/dto/create-question-option.dto';
import { QuestionOption } from '@/entities/question-option.entity';
import { ReadQuestionOptionDto } from '@/domain/question-option/dto/read-question-option.dto';
import { QuestionOptionAttachment } from '@/entities/question-option-attachment.entity';
import { CreateQuestionOptionAttachmentDto } from '@/domain/question-option/dto/create-quetion-option-attachment.dto';
import { ReadQuestionOptionAttachmentDto } from '@/domain/question-option/dto/read-quetion-option-attachment.dto';

@Injectable()
export class QuestionOptionProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(
                mapper,
                CreateQuestionOptionDto, 
                QuestionOption,
                forMember(
                    (d) => d.attachments,
                    mapWith(QuestionOptionAttachment, CreateQuestionOptionAttachmentDto, (s) => s.attachments)
                ),
                
            );
            createMap(mapper, ReadQuestionOptionDto, QuestionOption);

            createMap(mapper, ReadQuestionOptionAttachmentDto, QuestionOptionAttachment);
            
            createMap(mapper, QuestionOption, ReadQuestionOptionDto,
                forMember(
                    (d) => d.attachments,
                    mapWith(QuestionOptionAttachment, ReadQuestionOptionAttachmentDto, (s) => s.attachments)
                )
            );
            createMap(mapper, CreateQuestionOptionAttachmentDto, QuestionOptionAttachment);

        };
    }
}
