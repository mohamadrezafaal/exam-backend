import {PartialType} from "@nestjs/swagger";
import { CreateQuestionOptionDto } from "@/domain/question-option/dto/create-question-option.dto";

export class UpdateQuestionOptionDto extends PartialType(CreateQuestionOptionDto) {}
