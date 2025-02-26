import {AutoMap} from '@automapper/classes';
import {ApiProperty} from '@nestjs/swagger';
import {UpdateBaseDto} from '../base-dto/update-base.dto';

export class UpdateAuditedDto extends UpdateBaseDto {
  @AutoMap() @ApiProperty() modifiedBy: number;
}
