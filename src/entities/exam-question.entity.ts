import { BaseEntity } from '@/entities/common/base.entity';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exam } from './exam.entity';
import { Personal } from './personal.entity';
import { Question } from './question.entity';
import { VolunteerInfo } from './volunteer-info.entity';

@Entity({
  schema: 'exam',
  name: 'tb_ExamQuestion',
})
export class ExamQuestion extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Column({ unique: true, primary: true, type: 'bigint' })
  @ApiProperty({ required: false, readOnly: true })
  @AutoMap()
  id: number;

  @Column({ name: 'ExamId' })
  @AutoMap()
  examId: number;

  @ManyToOne(
    () => Exam,
    (exam) => exam.examquestions,
    // , {
    //   onDelete: 'CASCADE',
    //   orphanedRowAction: 'delete',
    // }
  )
  @JoinColumn({ name: 'ExamId' })
  @AutoMap(() => Exam)
  exam: Exam;

  @Column({ name: 'QuestionId' })
  @AutoMap()
  questionId: number;

  @ManyToOne(
    () => Question,
    (question) => question.examquestions,
    // , {
    //   onDelete: 'CASCADE',
    //   orphanedRowAction: 'delete',
    // }
  )
  @JoinColumn({ name: 'QuestionId' })
  @AutoMap(() => Question)
  question: Question;

  @Column({ name: 'VolunteerInfoId' })
  @AutoMap()
  volunteerInfoId: number;

  @ManyToOne(
    () => VolunteerInfo,
    // , (VolunteerInfo) => exam.examquestions
    // , {
    //   onDelete: 'CASCADE',
    //   orphanedRowAction: 'delete',
    // }
  )
  @JoinColumn({ name: 'VolunteerInfoId' })
  @AutoMap(() => VolunteerInfo)
  volunteerInfo: VolunteerInfo;

  @Column({ name: 'PersonalId' })
  @AutoMap()
  personalId: number;

  @ManyToOne(
    () => Personal,
    // , (Personal) => exam.examquestions
    // , {
    //   onDelete: 'CASCADE',
    //   orphanedRowAction: 'delete',
    // }
  )
  @JoinColumn({ name: 'PersonalId' })
  @AutoMap(() => Personal)
  personal: Personal;
}
