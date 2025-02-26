import {AutoMap} from '@automapper/classes';
import {ApiProperty} from '@nestjs/swagger';
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {BaseEntity} from './common/base.entity';
import {Organ} from "@/entities/organ.entity";

@Entity({
    schema: 'organ',
    name: 'tb_OrganAccessScopeWithDetail',
})
export class OrganAccessScopeWithDetail extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    @AutoMap()
    @ApiProperty({required: false, readOnly: true})
    id: number;

    @ManyToOne(() => Organ, {nullable: true})
    @JoinColumn({name: 'OrganId'})
    @ApiProperty({type: () => Organ, required: false})
    organ: Organ;

    @Column({name: 'OrganId', nullable: true})
    @AutoMap()
    organId: number;


    @ManyToOne(() => Organ, {nullable: true})
    @JoinColumn({name: 'AccessOrganId'})
    @ApiProperty({type: () => Organ, required: false})
    accessOrgan: Organ;

    @Column({name: 'AccessOrganId', nullable: true})
    @AutoMap()
    accessOrganId: number;

}
