import { ApiProperty } from "@nestjs/swagger";

export class CloseTiketDto {
    @ApiProperty()
    tiketId:number;
    @ApiProperty()
    senderOrganId:number;
    @ApiProperty()
    senderUserId:number;
    @ApiProperty()
    senderPostId:number;
    @ApiProperty()
    comment:string=null;
}