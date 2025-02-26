import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ExamQuestionRepository} from "@/domain/exam-question/exam-question.repository";
import {ExamQuestionService} from "@/domain/exam-question/exam-question.service";
import {ExamQuestionProfile} from "@/domain/exam-question/exam-question.profile";
import {Question} from "@/entities/question.entity";
import {ExamQuestionController} from "@/domain/exam-question/exam-question.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Question])],
    controllers: [ExamQuestionController],
    providers: [
        ExamQuestionRepository,
        ExamQuestionService,
        ExamQuestionProfile,
    ],
    exports: [
        ExamQuestionRepository,
        ExamQuestionService
    ],
})
export class ExamQuestionModule {
}
