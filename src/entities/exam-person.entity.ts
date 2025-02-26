import { AuditedEntity } from '@/entities/common/audited.entity';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Personal } from './personal.entity';
import { VolunteerInfo } from './volunteer-info.entity';

@Entity({
  schema: 'exam',
  name: 'tb_ExamPerson',
})
export class ExamPerson extends AuditedEntity {
  @PrimaryGeneratedColumn('increment')
  @Column({ unique: true, primary: true, type: 'bigint' })
  @ApiProperty({ required: false, readOnly: true })
  @AutoMap()
  id: number;

  @Column({ name: 'PersonalId', nullable: true })
  @ApiProperty()
  @AutoMap()
  personalId: number;

  @ManyToOne(() => Personal)
  @JoinColumn({ name: 'PersonalId' })
  @AutoMap()
  personal: Personal;

  @Column({ name: 'VolunteerInfoId', nullable: true })
  @ApiProperty()
  @AutoMap()
  volunteerInfoId: number;

  @ManyToOne(() => VolunteerInfo)
  @JoinColumn({ name: 'VolunteerInfoId' })
  @AutoMap()
  volunteerInfo: VolunteerInfo;

  @Column({ name: 'ExamId', nullable: true })
  @AutoMap()
  examId: number;

  // @ManyToOne(() => Exam, (exam) => exam.questions, {
  //   onDelete: 'CASCADE',
  //   orphanedRowAction: 'delete',
  // })
  // @JoinColumn({ name: 'ExamId' })
  // @AutoMap(() => Exam)
  // exam: Exam;

  @Column({ name: 'Score', nullable: true })
  @ApiProperty()
  @AutoMap()
  score: number;

  @Column({ name: 'StartTime', type: 'timestamp', nullable: true })
  @ApiProperty()
  @AutoMap()
  startTime: Date;

  @Column({ name: 'EndTime', type: 'timestamp', nullable: true })
  @ApiProperty()
  @AutoMap()
  endTime: Date;

  @Column({ name: 'IsPresent', nullable: true })
  @AutoMap()
  @ApiProperty()
  isPresent: boolean;
}
