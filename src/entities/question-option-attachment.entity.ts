import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {AutoMap} from '@automapper/classes';
import {ApiProperty} from '@nestjs/swagger';
import {BaseEntity} from "@/entities/common/base.entity";
import {QuestionOption} from "@/entities/question-option.entity";

@Entity({
    schema: 'exam',
    name: 'tb_OptionAttachment',
})
export class QuestionOptionAttachment extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    @Column({unique: true, primary: true, type: 'bigint'})
    @ApiProperty({required: false, readOnly: true})
    @AutoMap()
    id: number;

    @Column({name: 'OptionId'})
    @AutoMap()
    optionId: number;

    @ManyToOne(() => QuestionOption, (questionOption) => questionOption.attachments, {
        onDelete: "CASCADE",
        orphanedRowAction: "delete"
    })
    @JoinColumn({name: 'OptionId'})
    @AutoMap(() => QuestionOption)
    option: QuestionOption;

    @Column({type: 'varchar', length: 500})
    @ApiProperty()
    @AutoMap()
    fileName: string;

    @Column({type: "uuid"})
    @ApiProperty()
    @AutoMap()
    attachmentId: string;

}
