import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { BaseInfoItem } from './base-info-item.entity';
import { AuditedEntity } from './common/audited.entity';
import { GeographicalPlace } from './geographical-place.entity';

@Entity({
  schema: 'exam',
  name: 'tb_Personnel',
})
export class Personal extends AuditedEntity {
  @PrimaryGeneratedColumn('increment')
  @Column({ unique: true, primary: true, type: 'bigint' })
  @ApiProperty({ required: false, readOnly: true })
  @AutoMap()
  id: number;

  @AutoMap()
  @Column()
  @ApiProperty()
  nationalNo: string;

  @AutoMap()
  @Column({ name: 'PersonnelNo' })
  @ApiProperty()
  personalNo: string;

  @AutoMap()
  @Column()
  @ApiProperty()
  firstName: string;

  @AutoMap()
  @Column()
  @ApiProperty()
  lastName: string;

  @AutoMap()
  @Column()
  @ApiProperty()
  fatherName: string;

  @AutoMap()
  @Column({ type: 'varchar', length: 30, nullable: true })
  @ApiProperty()
  idNo: string;

  @AutoMap()
  @Column({ name: 'BirthPlaceId', nullable: true })
  @ApiProperty()
  birthPlaceId: number;

  @ManyToOne(() => GeographicalPlace, { nullable: true })
  @JoinColumn({ name: 'BirthPlaceId' })
  @ApiProperty({ type: () => GeographicalPlace, required: false })
  @AutoMap(() => GeographicalPlace)
  birthPlace!: GeographicalPlace;

  @AutoMap()
  @Column({ name: 'IssuePlaceId', nullable: true })
  @ApiProperty()
  issuePlaceId: number;

  @ManyToOne(() => GeographicalPlace, { nullable: true })
  @JoinColumn({ name: 'IssuePlaceId' })
  @ApiProperty({ type: () => GeographicalPlace, required: false })
  @AutoMap(() => GeographicalPlace)
  issuePlace!: GeographicalPlace;

  @AutoMap()
  @Column({ name: 'LocationId', nullable: true })
  locationId: number;

  @ManyToOne(() => GeographicalPlace, { nullable: true })
  @JoinColumn({ name: 'LocationId' })
  @ApiProperty({ type: () => GeographicalPlace, required: false })
  @AutoMap(() => GeographicalPlace)
  location!: GeographicalPlace;

  @AutoMap()
  @Column({ type: 'date' })
  @ApiProperty()
  birthDate: Date;

  @AutoMap()
  @Column({ type: 'date', nullable: true })
  @ApiProperty()
  issueDate: Date;

  @AutoMap()
  @Column({ length: '1000' })
  @ApiProperty()
  address: string;

  @AutoMap()
  @Column({ nullable: true })
  @ApiProperty()
  telephoneNumber: string;

  @AutoMap()
  @Column({ nullable: true })
  @ApiProperty()
  mobileNumber: string;

  @AutoMap()
  @Column({ length: '10', nullable: true })
  @ApiProperty()
  postalCode: string;

  @AutoMap()
  @Column({ name: 'NationalityId', nullable: true })
  @ApiProperty()
  nationalityId: number;

  @ManyToOne(() => BaseInfoItem, { nullable: true })
  @JoinColumn({ name: 'NationalityId' })
  @ApiProperty({ type: () => BaseInfoItem, required: false })
  @AutoMap(() => BaseInfoItem)
  nationality!: BaseInfoItem;

  @AutoMap()
  @Column({ name: 'MotherTongueId', nullable: true })
  @ApiProperty()
  motherTongueId: number;

  @ManyToOne(() => BaseInfoItem, { nullable: true })
  @JoinColumn({ name: 'MotherTongueId' })
  @ApiProperty({ type: () => BaseInfoItem, required: false })
  @AutoMap(() => BaseInfoItem)
  motherTongue!: BaseInfoItem;

  @AutoMap()
  @Column({ name: 'ReligionId', nullable: true })
  @ApiProperty()
  religionId: number;

  @ManyToOne(() => BaseInfoItem, { nullable: true })
  @JoinColumn({ name: 'ReligionId' })
  @ApiProperty({ type: () => BaseInfoItem, required: false })
  @AutoMap(() => BaseInfoItem)
  religion!: BaseInfoItem;

  @AutoMap()
  @Column({ name: 'AccentId', nullable: true })
  @ApiProperty()
  accentId: number;

  @ManyToOne(() => BaseInfoItem, { nullable: true })
  @JoinColumn({ name: 'AccentId' })
  @ApiProperty({ type: () => BaseInfoItem, required: false })
  @AutoMap(() => BaseInfoItem)
  accent!: BaseInfoItem;

  @AutoMap()
  @Column({ type: 'float', nullable: true })
  @ApiProperty()
  height: number;

  @AutoMap()
  @Column({ nullable: true })
  @ApiProperty()
  weight: number;

  @AutoMap()
  @Column({ name: 'ClothingSizeId', nullable: true })
  @ApiProperty()
  clothingSizeId: number;

  @ManyToOne(() => BaseInfoItem, { nullable: true })
  @JoinColumn({ name: 'ClothingSizeId' })
  @ApiProperty({ type: () => BaseInfoItem, required: false })
  @AutoMap(() => BaseInfoItem)
  clothingSize!: BaseInfoItem;

  @AutoMap()
  @Column({ name: 'HatSizeId', nullable: true })
  @ApiProperty()
  hatSizeId: number;

  @ManyToOne(() => BaseInfoItem, { nullable: true })
  @JoinColumn({ name: 'HatSizeId' })
  @ApiProperty({ type: () => BaseInfoItem, required: false })
  @AutoMap(() => BaseInfoItem)
  hatSize!: BaseInfoItem;

  @AutoMap()
  @Column({ name: 'ShoeSizeId', nullable: true })
  @ApiProperty()
  shoeSizeId: number;

  @ManyToOne(() => BaseInfoItem, { nullable: true })
  @JoinColumn({ name: 'ShoeSizeId' })
  @ApiProperty({ type: () => BaseInfoItem, required: false })
  @AutoMap(() => BaseInfoItem)
  shoeSize!: BaseInfoItem;

  @AutoMap()
  @Column({ name: 'BloodGroupId', nullable: true })
  @ApiProperty()
  bloodGroupId: number;

  @ManyToOne(() => BaseInfoItem, { nullable: true })
  @JoinColumn({ name: 'BloodGroupId' })
  @ApiProperty({ type: () => BaseInfoItem, required: false })
  @AutoMap(() => BaseInfoItem)
  bloodGroup!: BaseInfoItem;

  @AutoMap()
  @Column({ name: 'EyeColorId', nullable: true })
  @ApiProperty()
  eyeColorId: number;

  @ManyToOne(() => BaseInfoItem, { nullable: true })
  @JoinColumn({ name: 'EyeColorId' })
  @ApiProperty({ type: () => BaseInfoItem, required: false })
  @AutoMap(() => BaseInfoItem)
  eyeColor!: BaseInfoItem;

  @AutoMap()
  @Column({ nullable: true })
  @ApiProperty()
  brotherCount: number;

  @AutoMap()
  @Column({ nullable: true })
  @ApiProperty()
  sisterCount: number;

  @Column({ name: 'ImageId', nullable: true })
  @AutoMap()
  imageId: string;
}
