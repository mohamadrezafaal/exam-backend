import {PartialType} from "@nestjs/swagger";;
import { CreateVolunteerInfoDto } from "@/domain/volunteer-info/dto/create-volunteer-info.dto";

export class UpdateVolunteerInfoDto extends PartialType(CreateVolunteerInfoDto) {}
