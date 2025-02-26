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
import { Post } from './post.entity';

@Entity({
  schema: 'organ',
  name: 'tb_VirtualOrganPost',
})
export class OrganPost extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @AutoMap()
  @ApiProperty({ required: false, readOnly: true })
  id: number;

  @AutoMap(() => Organ)
  @ManyToOne(() => Organ, (Organ) => Organ.posts, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'OrganId', referencedColumnName: 'id' })
  organ: Organ;

  @PrimaryColumn({ name: 'OrganId', type: 'bigint' })
  @AutoMap()
  @Column()
  organId: number;

  @ManyToOne(() => Post, { cascade: true })
  @JoinColumn({ name: 'PostId' })
  @ApiProperty({ required: false })
  @AutoMap(() => Post)
  post: Post;

  @PrimaryColumn({ name: 'PostId' })
  @AutoMap()
  postId: number;

  @Column({ type: 'smallint' })
  priority: number;

  @ManyToOne(() => BaseInfoItem,)
  @JoinColumn({ name: 'PostTypeId' })
  @ApiProperty({ required: false })
  postType: BaseInfoItem;

  @Column({ name: 'PostTypeId', nullable: true })
  @AutoMap()
  postTypeId: number;

}
