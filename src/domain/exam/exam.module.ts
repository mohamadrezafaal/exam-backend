import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Exam} from "@/entities/exam.entity";
import {ExamController} from "@/domain/exam/exam.controller";
import {ExamRepository} from "@/domain/exam/exam.repository";
import {ExamService} from "@/domain/exam/exam.service";
import {ExamProfile} from "@/domain/exam/exam.profile";

@Module({
    imports: [TypeOrmModule.forFeature([Exam])],
    controllers: [ExamController],
    providers: [
        ExamRepository,
        ExamService,
        ExamProfile,
    ],
    exports: [
        ExamRepository,
        ExamService
    ],
})
export class ExamModule {
}
