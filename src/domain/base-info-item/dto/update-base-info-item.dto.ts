import {PartialType} from "@nestjs/swagger";;
import { CreateBaseInfoItemDto } from './create-base-info-item.dto';

export class UpdateBaseInfoItemDto extends PartialType(CreateBaseInfoItemDto) {}
