import { ReadQuestionOptionDto } from '@/domain/question-option/dto/read-question-option.dto';
import { AnswerSubmission } from '@/entities/exam-answer-submission.entity';
import { QuestionOption } from '@/entities/question-option.entity';
import { Question } from '@/entities/question.entity';
import { VolunteerInfo } from '@/entities/volunteer-info.entity';
import { createMap, forMember, Mapper, mapWith } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ReadExamQuestionDto } from '../exam-question/dto/read-exam-question.dto';
import { ReadVolunteerInfoDto } from '../volunteer-info/dto/read-volunteer-info.dto';
import { CreateAnswerSubmissionDto } from './dto/create-exam-answer-submission.dto';
import { ReadAnswerSubmissionDto } from './dto/read-exam-answer-submission.dto';
import { UpdateAnswerSubmissionDto } from './dto/update-exam-answer-submission.dto';

@Injectable()
export class AnswerSubmissionProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CreateAnswerSubmissionDto, AnswerSubmission);
      createMap(mapper, ReadAnswerSubmissionDto, AnswerSubmission);
      createMap(mapper, UpdateAnswerSubmissionDto, AnswerSubmission);
      createMap(
        mapper,
        AnswerSubmission,
        ReadAnswerSubmissionDto,
        forMember(
          (d) => d.volunteerInfo,
          mapWith(VolunteerInfo, ReadVolunteerInfoDto, (s) => s.volunteerInfo),
        ),
        forMember(
          (d) => d.question,
          mapWith(Question, ReadExamQuestionDto, (s) => s.question),
        ),
        forMember(
          (d) => d.questionOption,
          mapWith(
            QuestionOption,
            ReadQuestionOptionDto,
            (s) => s.questionOption,
          ),
        ),
      );
    };
  }
}
