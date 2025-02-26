import { ReadExamQuestionDto } from '@/domain/exam-question/dto/read-exam-question.dto';
import { ReadQuestionOptionDto } from '@/domain/question-option/dto/read-question-option.dto';
import { ReadVolunteerInfoDto } from '@/domain/volunteer-info/dto/read-volunteer-info.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ReadAnswerSubmissionDto {
  @ApiProperty()
  @AutoMap()
  id: number;

  @ApiProperty()
  @AutoMap()
  answerSubmissionTime: Date;

  @ApiProperty()
  @AutoMap()
  questionId: number;

  @ApiProperty()
  @AutoMap()
  volunteerInfoId: number;

  @ApiProperty()
  @AutoMap()
  optionId: number;

  @ApiProperty()
  @AutoMap()
  answerDescription: string;

  @ApiProperty({ type: () => ReadVolunteerInfoDto })
  @AutoMap(() => ReadVolunteerInfoDto)
  volunteerInfo: ReadVolunteerInfoDto;

  @ApiProperty({ type: () => ReadExamQuestionDto })
  @AutoMap(() => ReadExamQuestionDto)
  question: ReadExamQuestionDto;

  @ApiProperty({ type: () => ReadQuestionOptionDto })
  @AutoMap(() => ReadQuestionOptionDto)
  questionOption: ReadQuestionOptionDto;
}
