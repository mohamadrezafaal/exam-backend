import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {AutoMap} from '@automapper/classes';
import {ApiProperty} from '@nestjs/swagger';
import {BaseEntity} from "@/entities/common/base.entity";
import {Question} from "@/entities/question.entity";

@Entity({
    schema: 'exam',
    name: 'tb_QuestionAttachment',
})
export class QuestionAttachment extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    @Column({unique: true, primary: true, type: 'bigint'})
    @ApiProperty({required: false, readOnly: true})
    @AutoMap()
    id: number;

    @Column({name: 'QuestionId'})
    @AutoMap()
    questionId: number;

    @ManyToOne(() => Question, (question) => question.attachments, {
        onDelete: "CASCADE",
        orphanedRowAction: "delete"
    })
    @JoinColumn({name: 'QuestionId'})
    question: Question;


    @Column({type: 'varchar', length: 500})
    @ApiProperty()
    @AutoMap()
    fileName: string;

    @Column({type: "uuid"})
    @ApiProperty()
    @AutoMap()
    attachmentId: string;

}
