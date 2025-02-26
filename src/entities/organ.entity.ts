import { OrganAccessScopeWithDetail } from '@/entities/organ-access-scope-with-detail.entity';
import { OrganProperty } from '@/entities/organ-property.entity';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { BaseInfoItem } from './base-info-item.entity';
import { BaseEntity } from './common/base.entity';
import { OrganOperational } from './organ-operational.entity';
import { OrganPost } from './organ-post.entity';

@Entity({
  schema: 'organ',
  name: 'tb_VirtualOrgan',
})
// @Tree('nested-set')
export class Organ extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @AutoMap()
  @ApiProperty({ required: false, readOnly: true })
  id: number;

  // @ManyToOne(() => Organ, (organ) => organ.children, {
  //   nullable: true,
  // })
  // @JoinColumn({ name: 'ParentId' })
  // @ApiProperty({ required: false })
  // parent!: Organ;
  @TreeChildren()
  children!: Organ[];

  @TreeParent()
  @JoinColumn({ name: 'ParentId' })
  @ApiProperty({ type: () => Organ, required: false })
  @AutoMap(() => Organ)
  parent!: Organ;

  @Column({ name: 'ParentId', nullable: true })
  @AutoMap()
  @ApiProperty()
  parentId: number;

  // @OneToMany(() => Organ, (organ) => organ.parent)
  // children: Organ[];

  @ManyToOne(() => BaseInfoItem, { nullable: true })
  @JoinColumn({ name: 'OrganTypeId' })
  @ApiProperty({ type: () => BaseInfoItem, required: false })
  organType: BaseInfoItem;

  @Column({ name: 'OrganTypeId', nullable: true })
  @AutoMap()
  organTypeId: number;

  @Column({ nullable: true })
  @AutoMap()
  leftId: number;

  @Column({ nullable: true })
  @AutoMap()
  rightId: number;

  @Column({ nullable: true, name: 'nsright' })
  @AutoMap()
  nsright: number;

  @Column({ nullable: true, name: 'nsleft' })
  @AutoMap()
  nsleft: number;

  @Column({ nullable: true })
  @AutoMap()
  levelNumber: number;

  @Column({ nullable: true, type: 'char', length: 8 })
  @AutoMap()
  serialNumber: string;

  @Column({ nullable: true, type: 'char', length: 4 })
  @AutoMap()
  paragraphNumber: string;

  @Column({ nullable: false, length: 1000 })
  @AutoMap()
  title: string;

  @OneToMany(
    () => OrganAccessScopeWithDetail,
    (organAccessScopeWithDetail) => organAccessScopeWithDetail.accessOrgan,
  )
  @AutoMap()
  @ApiProperty()
  accessedOrgans: OrganAccessScopeWithDetail[];

  @OneToMany(
    () => OrganOperational,
    (OrganOperations) => OrganOperations.organ,
    {
      cascade: true,
      eager: true,
    },
  )
  @AutoMap()
  @ApiProperty()
  operations?: OrganOperational[];

  @OneToMany(() => OrganPost, (OrganPosts) => OrganPosts.organ, {
    cascade: true,
    eager: true,
  })
  @AutoMap()
  @ApiProperty()
  posts?: OrganPost[];

  @OneToMany(() => OrganProperty, (organProperty) => organProperty.organ, {
    cascade: true,
    eager: true,
  })
  @AutoMap(() => OrganProperty)
  @ApiProperty({ type: () => OrganProperty })
  organProperties?: OrganProperty[];

  @ManyToOne(() => BaseInfoItem, { nullable: true })
  @JoinColumn({ name: 'ForceId' })
  @ApiProperty({ type: () => BaseInfoItem, required: false })
  force: BaseInfoItem;

  @Column({ name: 'ForceId', nullable: true })
  @AutoMap()
  forceId: number;

  @Column({ nullable: true })
  @AutoMap()
  deactivateDate: Date;

  @Column({ type: 'timestamp' })
  rowVersion: Uint8Array;

  @Column({ nullable: true, type: 'varchar', length: 20 })
  @AutoMap()
  organCode: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  @ApiProperty()
  @AutoMap()
  organAddress: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @ApiProperty()
  @AutoMap()
  telephoneNumber: string;
}
