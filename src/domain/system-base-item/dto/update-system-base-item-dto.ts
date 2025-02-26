import {PartialType} from "@nestjs/swagger";;
import { CreateSystemBaseItemDto } from "@/domain/system-base-item/dto/create-system-base-item-dto";

export class UpdateSystemBaseItemDto extends PartialType(CreateSystemBaseItemDto) {}
