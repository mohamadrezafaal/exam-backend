import {
  IsSmallerThanTodayDateConstraint,
  IsValidNationalNoConstraint,
} from '@/common/validation';
import { Module } from '@nestjs/common';

import { BaseInfoItemModule } from '@/domain/base-info-item/base-info-item.module';
import { BaseInfoModule } from '@/domain/base-info/base-info.module';
import { ExamQuestionModule } from '@/domain/exam-question/exam-question.module';
import { ExamModule } from '@/domain/exam/exam.module';
import { GeographicalPlaceModule } from '@/domain/geographical-place/geographical-place.module';
import { QuestionOptionModule } from '@/domain/question-option/question-option.module';
import { SystemBaseItemModule } from '@/domain/system-base-item/system-base-item.module';
import { SystemProcessDocumentModule } from '@/domain/system-process-document/system-process-document.module';
import { VolunteerInfoModule } from '@/domain/volunteer-info/volunteer-info.module';
import { ExternalClientModule } from '@/external-client/external-client.module';
import { AnswerSubmissionModule } from './exam-answer-submission/exam-answer-submission.module';
import { OrganOperationalModule } from './organ-operational/organ-operational.module';
import { OrganPostModule } from './organ-post/organ-post.module';
import { OrganPropertyModule } from './organ-property/organ-propety.module';
import { OrganModule } from './organ/organ.module';

@Module({
  imports: [
    ExternalClientModule,
    BaseInfoModule,
    BaseInfoItemModule,
    GeographicalPlaceModule,
    SystemProcessDocumentModule,
    SystemBaseItemModule,
    VolunteerInfoModule,
    ExamQuestionModule,
    ExamModule,
    QuestionOptionModule,
    OrganModule,
    OrganOperationalModule,
    OrganPostModule,
    OrganPropertyModule,
    AnswerSubmissionModule,
  ],
  providers: [IsValidNationalNoConstraint, IsSmallerThanTodayDateConstraint],
  exports: [],
})
export class DomainModule {}
