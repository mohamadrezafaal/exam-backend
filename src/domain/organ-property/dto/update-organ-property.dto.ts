import { ApiProperty, PartialType } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";
import {CreateOrganPropertyDto } from "./create-organ-property.dto";

export class UpdateOrganPropertyDto extends PartialType(CreateOrganPropertyDto){
    @ApiProperty()
    @AutoMap()
    id:number;
}