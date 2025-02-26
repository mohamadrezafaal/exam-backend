import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Organ } from './organ.entity';
import { AuditedEntity } from './common/audited.entity';
import { GeographicalPlace } from './geographical-place.entity';
import { BaseInfoItem } from './base-info-item.entity';

@Entity({
  schema: 'organ',
  name: 'tb_VirtualOrganProperty',
})
export class OrganProperty extends AuditedEntity {
  @PrimaryGeneratedColumn('increment')
  @AutoMap()
  @ApiProperty({ required: false, readOnly: true })
  id: number;

  @ManyToOne(() => Organ, (Organ)=>Organ.organProperties,{nullable: true})
  @JoinColumn({ name: 'OrganId' })
  @ApiProperty({type: () => Organ,required: false })
  organ: Organ;

  @PrimaryColumn({ name: 'OrganId', type: 'bigint' })
  @AutoMap()
  @Column()
  organId: number;


  @AutoMap()
  @Column({ type: 'date' })
  changeDate: Date;

  @AutoMap()
  @Column({ name: 'GeographicalPlaceId' })
  @ApiProperty()
  geographicalPlaceId: number;

  @ManyToOne(() => GeographicalPlace)
  @JoinColumn({ name: 'GeographicalPlaceId' })
  @ApiProperty({type: () => GeographicalPlace, required: false })
  geographicalPlace: GeographicalPlace;

  @ManyToOne(() => BaseInfoItem, { nullable: true })
  @JoinColumn({ name: 'DeprivationDegreeId' })
  @ApiProperty({ required: false,type: () => BaseInfoItem })
  deprivationDegree: BaseInfoItem;

  @Column({ name: 'DeprivationDegreeId', nullable: true })
  @AutoMap()
  deprivationDegreeId: number;

  @ManyToOne(() => BaseInfoItem, { nullable: true })
  @JoinColumn({ name: 'BadWeatherDegreeId' })
  @ApiProperty({ required: false,type: () => BaseInfoItem })
  badWeatherDegree: BaseInfoItem;

  @Column({ name: 'BadWeatherDegreeId', nullable: true })
  @AutoMap()
  badWeatherDegreeId: number;

  @ManyToOne(() => BaseInfoItem, { nullable: false })
  @JoinColumn({ name: 'AreaTypeId' })
  @ApiProperty({ required: false,type: () => BaseInfoItem })
  areaType: BaseInfoItem;

  @Column({ name: 'AreaTypeId', nullable: false })
  @AutoMap()
  areaTypeId: number;

}
