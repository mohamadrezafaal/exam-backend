import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';
import { AuditedEntity } from './common/audited.entity';

@Entity({
  schema: 'exam',
  name: 'tb_Personnel',
})
export class Personal extends AuditedEntity {
  @PrimaryGeneratedColumn('increment')
  @Column({ unique: true, primary: true, type: 'bigint' })
  @ApiProperty({ required: false, readOnly: true })
  @AutoMap()
  id: number;

  @AutoMap()
  @Column()
  @ApiProperty()
  nationalNo: string;

  @AutoMap()
  @Column({ name: 'PersonnelNo' })
  @ApiProperty()
  personalNo: string;

  @AutoMap()
  @Column()
  @ApiProperty()
  firstName: string;

  @AutoMap()
  @Column()
  @ApiProperty()
  lastName: string;

  @AutoMap()
  @Column()
  @ApiProperty()
  fatherName: string;
}
