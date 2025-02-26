import { BaseEntity } from '@/entities/common/base.entity';
import { QuestionAttachment } from '@/entities/question-attachment.entity';
import { QuestionOption } from '@/entities/question-option.entity';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

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

  @Column()
  @ApiProperty()
  @AutoMap()
  questionTitle: string;

  @Column({ nullable: true })
  @AutoMap()
  order: number;

  @Column({ name: 'IsDescriptive', nullable: true })
  @AutoMap()
  @ApiProperty()
  isDescriptive: boolean;

  @Column({ name: 'AnswerDescription', type: 'text', nullable: true })
  @AutoMap()
  @ApiProperty()
  answerDescription: string;

  @Column({ name: 'DifficultyLevel', type: 'text', nullable: true })
  @AutoMap()
  @ApiProperty()
  difficultyLevel: 'easy' | 'medium' | 'hard';

  @Column({ name: 'ExamId' })
  @AutoMap()
  examId: number;

  // @ManyToOne(() => Exam, (exam) => exam.questions, {
  //   onDelete: 'CASCADE',
  //   orphanedRowAction: 'delete',
  // })
  // @JoinColumn({ name: 'ExamId' })
  // @AutoMap(() => Exam)
  // exam: Exam;

  @ApiProperty()
  @AutoMap()
  @OneToMany(
    () => QuestionAttachment,
    (questionAttachment) => questionAttachment.question,
    {
      cascade: true,
      eager: true, // باعث می شود هنگام QUERY زدن به صورت اتوماتیک در لیست آورده شود
      orphanedRowAction: 'delete',
    },
  )
  attachments: QuestionAttachment[];

  @ApiProperty()
  @AutoMap()
  @OneToMany(
    () => QuestionOption,
    (questionOption) => questionOption.question,
    {
      cascade: true,
      eager: true, // باعث می شود هنگام QUERY زدن به صورت اتوماتیک در لیست آورده شود
      orphanedRowAction: 'delete',
    },
  )
  options: QuestionOption[];

  //   @ApiProperty()
  //   @AutoMap()
  //   @OneToMany(() => Answer, (answer) => answer.question, {
  //     cascade: true,
  //     eager: true, // باعث می شود هنگام QUERY زدن به صورت اتوماتیک در لیست آورده شود
  //     orphanedRowAction: 'delete',
  //   })
  //   answers: Answer[];
}
