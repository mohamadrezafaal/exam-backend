import {ApiProperty} from "@nestjs/swagger";

export class UpdateWorkflowDefaultTextDto {
    @ApiProperty()
    id:number
    @ApiProperty()
    comment:string
    @ApiProperty()
    title:string
    @ApiProperty()
    suggestion:string
}