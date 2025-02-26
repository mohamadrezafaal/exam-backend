import {PartialType} from "@nestjs/swagger";;
import { CreateBaseInfoDto } from './create-base-info.dto';

export class UpdateBaseInfoDto extends PartialType(CreateBaseInfoDto) {}
