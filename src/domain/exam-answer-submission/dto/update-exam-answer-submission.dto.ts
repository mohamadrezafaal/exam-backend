import { PartialType } from '@nestjs/swagger';
import { CreateAnswerSubmissionDto } from './create-exam-answer-submission.dto';

export class UpdateAnswerSubmissionDto extends PartialType(
  CreateAnswerSubmissionDto,
) {}
