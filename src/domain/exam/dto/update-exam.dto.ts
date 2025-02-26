import {PartialType} from "@nestjs/swagger";
import {CreateExamDto} from "@/domain/exam/dto/create-exam.dto";

export class UpdateExamDto extends PartialType(CreateExamDto) {}
