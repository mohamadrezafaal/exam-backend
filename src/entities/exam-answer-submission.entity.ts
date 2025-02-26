import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {AutoMap} from '@automapper/classes';
import {ApiProperty} from '@nestjs/swagger';
import {BaseEntity} from "@/entities/common/base.entity";
import {Question} from "@/entities/question.entity";
import { VolunteerInfo } from './volunteer-info.entity';
import { QuestionOption } from './question-option.entity';

@Entity({
    schema: 'exam',
    name: 'tb_AnswerSubmission',
})
export class AnswerSubmission extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    @Column({unique: true, primary: true, type: 'bigint'})
    @ApiProperty({required: false, readOnly: true})
    @AutoMap()
    id: number;

    @Column({name: 'AnswerSubmissionTime',type: 'timestamp',})
    @ApiProperty()
    @AutoMap()
    answerSubmissionTime: Date;

    @Column({name: 'QuestionId'})
    @ApiProperty()
    @AutoMap()
    questionId: number;

    @ManyToOne(() => Question)
    @JoinColumn({name: 'QuestionId'})
    @AutoMap()
    question: Question;


    @Column({name: 'VolunteerInfoId'})
    @ApiProperty()
    @AutoMap()
    volunteerInfoId: number;

    @ManyToOne(() => VolunteerInfo)
    @JoinColumn({name: 'VolunteerInfoId'})
    @AutoMap()
    volunteerInfo: VolunteerInfo;

    @Column({name: 'OptionId'})
    @ApiProperty()
    @AutoMap()
    optionId: number;

    @ManyToOne(() => QuestionOption)
    @JoinColumn({name: 'OptionId'})
    @AutoMap()
    questionOption: QuestionOption;

    @Column({name: 'AnswerDescription',type: 'varchar',length: 1000})
    @ApiProperty()
    @AutoMap()
    answerDescription: string;


}
