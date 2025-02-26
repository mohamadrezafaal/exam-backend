import { ApiProperty, PartialType } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";
import { CreateOrganPostDto } from "./create-organ-post.dto";

export class UpdateOrganPostDto extends PartialType(CreateOrganPostDto){
    @ApiProperty()
    @AutoMap()
    id:number;
}