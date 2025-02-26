import { PartialType } from "@nestjs/swagger";
import { CreateTiketDto } from "./create-tiket.dto";
import { ApiProperty } from "@nestjsx/crud/lib/crud";

export class UpdateTiketDto extends PartialType(CreateTiketDto) {
    @ApiProperty()
    id: number;

}
