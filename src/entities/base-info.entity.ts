import {BaseEntity} from './common/base.entity';
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn,} from 'typeorm';
import {AutoMap} from '@automapper/classes';
import {BaseInfoItem} from './base-info-item.entity';
import {ApiProperty} from '@nestjs/swagger';

@Entity({
  schema: 'base',
  name: 'tb_BaseTable',
})
export class BaseInfo extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @AutoMap()
  @ApiProperty({ required: false, readOnly: true })
  id: number;

  @Column({ type: 'int', nullable: true })
  @AutoMap()
  @ApiProperty()
  systemId: number;

  @Column({ name: 'TableName', length: 50 })
  @AutoMap()
  @ApiProperty()
  name: string;

  @ManyToOne(() => BaseInfo, (baseTable) => baseTable.children, {
    nullable: true,
  })
  @JoinColumn({ name: 'ParentTableId' })
  @ApiProperty({ required: false })
  parent!: BaseInfo;

  @Column({ name: 'ParentTableId', nullable: true })
  @AutoMap()
  @ApiProperty()
  parentId: number;

  @OneToMany(() => BaseInfo, (baseTable) => baseTable.parent)
  children: BaseInfo[];

  @OneToMany(() => BaseInfoItem, (baseItem) => baseItem.baseInfo)
  @AutoMap(() => [BaseInfoItem])
  @ApiProperty()
  items: BaseInfoItem[];

  @Column()
  @AutoMap()
  @ApiProperty()
  isEditable: boolean;
}
