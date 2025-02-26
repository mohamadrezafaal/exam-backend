import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseInfoItem } from './base-info-item.entity';
import { BaseEntity } from './common/base.entity';
import { Organ } from './organ.entity';

@Entity({
  schema: 'organ',
  name: 'tb_VirtualOrganOperational',
})
export class OrganOperational extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @AutoMap()
  @ApiProperty({ required: false, readOnly: true })
  id: number;

  @ManyToOne(() => Organ, (Organ) => Organ.operations, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'OrganId' })
  @ApiProperty({ required: false })
  organ: Organ;

  @PrimaryColumn({ name: 'OrganId' })
  @AutoMap()
  organId: number;

  @ManyToOne(() => BaseInfoItem, (baseitem) => baseitem.operations, { nullable: true })
  @JoinColumn({ name: 'OperationalId' })
  @ApiProperty({ required: false })
  operational: BaseInfoItem;

  @Column({ name: 'OperationalId', nullable: true })
  @AutoMap()
  operationalId: number;
}
