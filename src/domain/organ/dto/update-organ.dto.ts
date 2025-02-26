import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateOrganDto } from "./create-organ.dto";
import { AutoMap } from "@automapper/classes";

export class UpdateOrganDto extends PartialType(CreateOrganDto){
    @ApiProperty()
    @AutoMap()
    id:number;
}