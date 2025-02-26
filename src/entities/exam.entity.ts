import { BaseInfoItem } from '@/entities/base-info-item.entity';
import { AuditedEntity } from '@/entities/common/audited.entity';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity({
  schema: 'exam',
  name: 'tb_ExamInfo',
})
export class Exam extends AuditedEntity {
  @PrimaryGeneratedColumn('increment')
  @Column({ unique: true, primary: true, type: 'bigint' })
  @ApiProperty({ required: false, readOnly: true })
  @AutoMap()
  id: number;

  @Column()
  @ApiProperty()
  @AutoMap()
  examTitle: string;

  @Column({ name: 'ExamTypeId' })
  @ApiProperty()
  @AutoMap()
  examTypeId: number;

  @Column({ name: 'ExamHoldId', nullable: true })
  @ApiProperty()
  @AutoMap()
  examHoldId: number;

  @Column({ name: 'Duration', nullable: true })
  @ApiProperty()
  @AutoMap()
  duration: number;

  @Column({ name: 'FromDate', nullable: true })
  @ApiProperty()
  @AutoMap()
  fromDate: Date;

  @Column({ name: 'ToDate', nullable: true })
  @ApiProperty()
  @AutoMap()
  toDate: Date;

  @ManyToOne(() => BaseInfoItem)
  @JoinColumn({ name: 'ExamTypeId' })
  @AutoMap(() => BaseInfoItem)
  examType: BaseInfoItem;

  @ManyToOne(() => BaseInfoItem)
  @JoinColumn({ name: 'ExamHoldId' })
  @AutoMap(() => BaseInfoItem)
  examHold: BaseInfoItem;

  // @ApiProperty()
  // @AutoMap()
  // @OneToMany(() => Question, (question) => question.exam, {
  //   cascade: true,
  //   eager: true, // باعث می شود هنگام QUERY زدن به صورت اتوماتیک در لیست آورده شود
  //   orphanedRowAction: 'delete',
  // })
  // questions: Question[];
}
