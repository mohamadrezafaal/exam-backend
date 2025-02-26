import { CreateExamQuestionDto } from '@/domain/exam-question/dto/create-exam-question.dto';
import { CreateQuestionAttachmentDto } from '@/domain/exam-question/dto/create-question-attachment.dto';
import { CreateQuestionOptionDto } from '@/domain/question-option/dto/create-question-option.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';

export class CreateAnswerSubmissionDto {
  @ApiProperty()
  @AutoMap()
  @IsDate()
  answerSubmissionTime: Date;

  @AutoMap()
  @ApiProperty()
  questionId: number;

  @AutoMap()
  @ApiProperty()
  volunteerInfoId: number;

  @AutoMap()
  @ApiProperty()
  optionId: number;

  @AutoMap()
  @ApiProperty()
  answerDescription: string;

}
