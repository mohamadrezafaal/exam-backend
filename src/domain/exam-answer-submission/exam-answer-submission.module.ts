import { AnswerSubmission } from '@/entities/exam-answer-submission.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerSubmissionController } from './exam-answer-submission.controller';
import { AnswerSubmissionProfile } from './exam-answer-submission.profile';
import { AnswerSubmissionRepository } from './exam-answer-submission.repository';
import { AnswerSubmissionService } from './exam-answer-submission.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerSubmission])],
  controllers: [AnswerSubmissionController],
  providers: [
    AnswerSubmissionRepository,
    AnswerSubmissionService,
    AnswerSubmissionProfile,
  ],
  exports: [AnswerSubmissionRepository, AnswerSubmissionService],
})
export class AnswerSubmissionModule {}
