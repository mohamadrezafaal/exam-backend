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
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { BaseInfoItem } from './base-info-item.entity';
import { BaseEntity } from './common/base.entity';
import { OrganOperational } from './organ-operational.entity';
import { OrganPost } from './organ-post.entity';

@Entity({
  schema: 'exam',
  name: 'tb_QuestionSubject',
})
@Tree('nested-set')
export class ExamSubject extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @AutoMap()
  @ApiProperty({ required: false, readOnly: true })
  id: number;

  @TreeChildren()
  children!: ExamSubject[];

  @TreeParent()
  // @JoinColumn({ name: 'ParentId' })
  @ApiProperty({ type: () => ExamSubject, required: false })
  @AutoMap(() => ExamSubject)
  parent: ExamSubject;

  // @Column({ name: 'ParentId', nullable: true })
  // @AutoMap()
  // @ApiProperty()
  // parentId: number;



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
