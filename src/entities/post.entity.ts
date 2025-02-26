import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './common/base.entity';

@Entity({
  schema: 'organ',
  name: 'tb_VirtualPost',
})
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @AutoMap()
  @ApiProperty({ required: false, readOnly: true })
  id: number;

  @Column()
  @AutoMap()
  title: string;
  
  // @OneToMany(() => OrganPost, (OrganPost) => OrganPost.post,{ nullable: false })
  // @AutoMap()
  // @ApiProperty()
  // organPosts: OrganPost[];
}
