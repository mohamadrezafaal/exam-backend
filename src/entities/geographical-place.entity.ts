import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent,} from 'typeorm';
import {AutoMap} from '@automapper/classes';
import {ApiProperty} from '@nestjs/swagger';
import {BaseInfoItem} from './base-info-item.entity';
import {BaseEntity} from './common/base.entity';

@Entity({
    schema: 'base',
    name: 'tb_GeographicalPlace',
})
@Tree('nested-set')
export class GeographicalPlace extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    @Column({unique: true, primary: true, type: 'int'})
    @AutoMap()
    @ApiProperty({required: false, readOnly: true})
    id: number;

    @TreeChildren()
    children!: GeographicalPlace[];

    @TreeParent()
    @JoinColumn({name: 'ParentId'})
    @ApiProperty({required: false, type: () => GeographicalPlace})
    @AutoMap(() => GeographicalPlace)
    parent!: GeographicalPlace;

    @Column({name: 'ParentId', nullable: true})
    @AutoMap()
    @ApiProperty()
    parentId!: number;

    @Column({type: 'varchar', length: 255, nullable: true})
    @AutoMap()
    @ApiProperty()
    title: string;

    @ManyToOne(() => BaseInfoItem, {nullable: true})
    @JoinColumn({name: 'TypeId'})
    @ApiProperty({required: false, type: () => BaseInfoItem})
    @AutoMap(() => BaseInfoItem)
    type!: BaseInfoItem;

    @Column({name: 'TypeId', nullable: true})
    @AutoMap()
    @ApiProperty()
    typeId!: number;

    @Column({name: 'ItemCode', nullable: true, type: 'varchar', length: 4})
    @AutoMap()
    @ApiProperty()
    itemCode: string;

    @Column({name: 'BaseCode', nullable: true, type: 'varchar', length: 15})
    @AutoMap()
    @ApiProperty()
    baseCode: string;

    @Column({name: 'LeftId', nullable: true})
    @AutoMap()
    leftId: number;

    @Column({name: 'RightId', nullable: true})
    @AutoMap()
    rightId: number;

    @Column({name: 'LevelNumber', nullable: true})
    @AutoMap()
    levelNumber: number;

    @Column({name: 'DeActiveDate', nullable: true, type: 'date'})
    @AutoMap()
    deActiveDate: Date;
}
