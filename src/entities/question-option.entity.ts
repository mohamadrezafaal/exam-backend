import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {AutoMap} from '@automapper/classes';
import {ApiProperty} from '@nestjs/swagger';
import {BaseEntity} from "@/entities/common/base.entity";
import {Question} from "@/entities/question.entity";
import { QuestionOptionAttachment } from '@/entities/question-option-attachment.entity';

@Entity({
    schema: 'exam',
    name: 'tb_QuestionOption',
})
export class QuestionOption extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    @Column({unique: true, primary: true, type: 'bigint'})
    @ApiProperty({required: false, readOnly: true})
    @AutoMap()
    id: number;

    @Column({name: 'QuestionId'})
    @AutoMap()
    questionId: number;

    @ManyToOne(() => Question,(question)=>question.options,{
        onDelete: "CASCADE",
        orphanedRowAction: "delete"
    })
    @JoinColumn({name: 'QuestionId'})
    @AutoMap(() => Question)
    question: Question;

    @Column()
    @ApiProperty()
    @AutoMap()
    optionDesc: string;

    @Column({nullable: true})
    @AutoMap()
    order: number;

    @Column({ name: 'IsCorrect', nullable: true })
    @AutoMap()
    @ApiProperty()
    isCorrect: boolean;

    @ApiProperty()
    @AutoMap()
    @OneToMany(
        () => QuestionOptionAttachment,
        (questionOptionAttachment) => questionOptionAttachment.option,
        {
            cascade: true,
            eager: true, // باعث می شود هنگام QUERY زدن به صورت اتوماتیک در لیست آورده شود
            orphanedRowAction: "delete",
        }
    )
    attachments: QuestionOptionAttachment[];

}
