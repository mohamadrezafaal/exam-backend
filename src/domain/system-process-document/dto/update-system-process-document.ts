import {PartialType} from "@nestjs/swagger";;
import { CreateSystemProcessDocumentDto } from "@/domain/system-process-document/dto/create-system-process-document";

export class UpdateSystemProcessDocumentDto extends PartialType(CreateSystemProcessDocumentDto) {}
