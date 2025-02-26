import {AutoMap} from '@automapper/classes';
import {ApiProperty} from '@nestjs/swagger';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {BaseInfo} from './base-info.entity';
import {BaseEntity} from './common/base.entity';
import {SystemBaseItem} from './system-base-item.entity';
import {SystemProcessDocument} from './system-process-document.entity';
import { OrganOperational } from './organ-operational.entity';


@Entity({
    schema: 'base',
    name: 'tb_BaseItem',
})
export class BaseInfoItem extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    @Column({unique: true, primary: true})
    @AutoMap()
    @ApiProperty({required: false, readOnly: true})
    id: number;

    @Column({name: 'ItemCode'})
    @AutoMap()
    @ApiProperty()
    code: number;

    @Column({name: 'ItemName', nullable: false, length: 200})
    @AutoMap()
    @ApiProperty()
    name: string;

    @ManyToOne(() => BaseInfoItem, (baseItem) => baseItem.children, {
        nullable: true,
    })
    @JoinColumn({name: 'ParentId', referencedColumnName: 'id'})
    @ApiProperty({type: () => BaseInfoItem, required: false})
    parent!: BaseInfoItem;

    @Column({name: 'ParentId', nullable: true})
    @ApiProperty()
    parentId: number;

    @OneToMany(() => BaseInfoItem, (baseInfoItem) => baseInfoItem.parent)
    children: BaseInfoItem[];

    @ManyToOne(() => BaseInfo, (BaseInfo) => BaseInfo.items)
    @JoinColumn({name: 'TableId'})
    @ApiProperty({type: () => BaseInfo})
    baseInfo: BaseInfo;

    //@PrimaryColumn({ name: 'TableId' })
    @Column({name: 'TableId'})
    @AutoMap()
    baseInfoId: number;

    @Column()
    @AutoMap()
    @ApiProperty()
    isActive: boolean;

    @OneToMany(() => SystemBaseItem, (system) => system.baseItem, {
        cascade: ['insert', 'update', 'remove'],
    })
    systems: SystemBaseItem[];

    @OneToMany(() => SystemProcessDocument, (system) => system.document, {
        cascade: ['insert', 'update', 'remove'],
    })
    systemsProcessDocuments: SystemProcessDocument[];

    @OneToMany(() => OrganOperational, (OrganOperations) => OrganOperations.operational)
    @AutoMap()
    @ApiProperty()
    operations: OrganOperational[];

}
