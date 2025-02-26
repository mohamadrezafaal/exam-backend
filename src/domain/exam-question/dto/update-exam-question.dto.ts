import {PartialType} from "@nestjs/swagger";
import {CreateExamQuestionDto} from "@/domain/exam-question/dto/create-exam-question.dto";

export class UpdateExamQuestionDto extends PartialType(CreateExamQuestionDto) {}
