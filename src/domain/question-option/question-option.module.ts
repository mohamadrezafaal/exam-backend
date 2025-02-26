import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { QuestionOptionService } from '@/domain/question-option/question-option.service';
import { QuestionOptionRepository } from '@/domain/question-option/question-option.repository';
import { QuestionOptionController } from '@/domain/question-option/question-option.controller';
import { QuestionOption } from '@/entities/question-option.entity';
import { QuestionOptionProfile } from '@/domain/question-option/question-option.profile';

@Module({
    imports: [TypeOrmModule.forFeature([QuestionOption])],
    controllers: [QuestionOptionController],
    providers: [
        QuestionOptionRepository,
        QuestionOptionService,
        QuestionOptionProfile,
    ],
    exports: [
        QuestionOptionRepository,
        QuestionOptionService,
    ],
})
export class QuestionOptionModule {
}
