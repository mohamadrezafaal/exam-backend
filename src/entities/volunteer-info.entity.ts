import {Entity} from 'typeorm';
import {Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {AutoMap} from '@automapper/classes';
import {ApiProperty} from '@nestjs/swagger';
import {BaseInfoItem} from "@/entities/base-info-item.entity";
import {GeographicalPlace} from "@/entities/geographical-place.entity";
import {AuditedEntity} from "@/entities/common/audited.entity";

@Entity({
    schema: 'recruitment',
    name: 'tb_VolunteerInfo',
})
export class VolunteerInfo extends AuditedEntity {

    @PrimaryGeneratedColumn('increment')
    @Column({unique: true, primary: true, type: 'bigint'})
    @ApiProperty({required: false, readOnly: true})
    @AutoMap()
    id: number;

    // طیف استخدام (افسری یا بورسیه یا ...)
    @ManyToOne(() => BaseInfoItem)
    @JoinColumn({ name: 'EmploymentSpectrumId' })
    @ApiProperty()
    @AutoMap()
    employmentSpectrum: BaseInfoItem;

    @Column({ name: 'EmploymentSpectrumId', nullable: false })
    @AutoMap()
    @ApiProperty()
    employmentSpectrumId: number;


    // نوع جذب (آزمون یا ...)
    @ManyToOne(() => BaseInfoItem)
    @JoinColumn({ name: 'EmploymentTypeId' })
    @ApiProperty()
    @AutoMap()
    employmentType: BaseInfoItem;

    @Column({ name: 'EmploymentTypeId', nullable: false })
    @AutoMap()
    @ApiProperty()
    employmentTypeId: number;



    // نیرو درخواستی
    @ManyToOne(() => BaseInfoItem, { nullable: false })
    @JoinColumn({ name: 'ForceId', referencedColumnName: 'id', })
    @ApiProperty()
    @AutoMap()
    @AutoMap(() => BaseInfoItem)
    force: BaseInfoItem;

    @Column({ name: 'ForceId', nullable: false })
    @AutoMap()
    @ApiProperty()
    forceId: number;


    // کد ملی
    @Column()
    @ApiProperty()
    @AutoMap()
    nationalNo: string;

    // نام
    @AutoMap()
    @Column()
    @ApiProperty()
    firstName: string;

    // نام خانوادگی
    @AutoMap()
    @Column()
    @ApiProperty()
    lastName: string;


    // نام مستعار
    @AutoMap()
    @Column()
    @ApiProperty()
    nickName: string;

    // نام خانوادگی قبلی
    @AutoMap()
    @Column()
    @ApiProperty()
    previousLastName: string;


    // جنسیت
    @Column({ name: 'GenderId', nullable: false })
    @ApiProperty()
    @AutoMap()
    genderId: number;

    @ManyToOne(() => BaseInfoItem, { nullable: false })
    @JoinColumn({ name: 'GenderId' })
    @AutoMap(() => BaseInfoItem)
    gender: BaseInfoItem;

    // نام پدر
    @AutoMap()
    @Column()
    @ApiProperty()
    fatherName: string;

    // تلفن ثابت
    @AutoMap()
    @Column({nullable: true})
    @ApiProperty()
    telephoneNumber: string;

    // موبایل
    @AutoMap()
    @Column({nullable: true})
    @ApiProperty()
    mobileNumber: string;

    // شماره شناسنامه
    @AutoMap()
    @Column({type: 'varchar', length: 30, nullable: true})
    @ApiProperty()
    idNo: string;

    // سریال شناسنامه
    @AutoMap()
    @Column({type: 'varchar', length: 6, nullable: true})
    @ApiProperty()
    idSerial: string;

    // سری شناسنامه
    @AutoMap()
    @Column({type: 'varchar', length: 1, nullable: true})
    @ApiProperty()
    idSeri: string;

    // محل تولد
    @AutoMap()
    @Column({name: 'BirthPlaceId', nullable: true})
    @ApiProperty()
    birthPlaceId: number;

    @ManyToOne(() => GeographicalPlace, {nullable: true})
    @JoinColumn({name: 'BirthPlaceId'})
    @ApiProperty({type: () => GeographicalPlace,required: false})
    @AutoMap(() => GeographicalPlace)
    birthPlace: GeographicalPlace;

    // تاریخ تولد
    @AutoMap()
    @Column({type: 'date'})
    @ApiProperty()
    birthDate: Date;

    // محل سکونت
    @AutoMap()
    @Column({name: 'LocationId', nullable: true})
    locationId: number;

    @ManyToOne(() => GeographicalPlace, {nullable: true})
    @JoinColumn({name: 'LocationId'})
    @ApiProperty({type: () => GeographicalPlace, required: false})
    @AutoMap(() => GeographicalPlace)
    location: GeographicalPlace;

    // آدرس
    @AutoMap()
    @Column({length: '1000'})
    @ApiProperty()
    address: string;

    // کد پستی
    @AutoMap()
    @Column({length: '10', nullable: true})
    @ApiProperty()
    postalCode: string;

    @ManyToOne(() => BaseInfoItem, { nullable: false })
    @JoinColumn({ name: 'EducationLevelId' })
    @ApiProperty()
    educationLevel: BaseInfoItem;

    @Column({ name: 'EducationLevelId', nullable: false })
    @AutoMap()
    @ApiProperty()
    educationLevelId: number;


    @Column({ nullable: false, name: 'EducationFieldId' })
    @ApiProperty({ required: false })
    @AutoMap()
    educationFieldId: number;

    @ManyToOne(() => BaseInfoItem, { nullable: false })
    @JoinColumn({ name: 'EducationFieldId', referencedColumnName: 'id', })
    @ApiProperty()
    @AutoMap(() => BaseInfoItem)
    educationField: BaseInfoItem;


    @Column({ nullable: false, name: 'EducationGradeId' })
    @ApiProperty()
    @AutoMap()
    educationGradeId: number;

    @ManyToOne(() => BaseInfoItem, { nullable: false })
    @JoinColumn({ name: 'EducationGradeId', referencedColumnName: 'id', })
    @ApiProperty()
    @AutoMap(() => BaseInfoItem)
    educationGrade: BaseInfoItem;

    // محل ثبت نام
    @AutoMap()
    @Column({name: 'ApplyPlaceId', nullable: true})
    @ApiProperty()
    applyPlaceId: number;

    @ManyToOne(() => GeographicalPlace, {nullable: true})
    @JoinColumn({name: 'ApplyPlaceId'})
    @ApiProperty({type: () => GeographicalPlace,required: false})
    @AutoMap(() => GeographicalPlace)
    applyPlace: GeographicalPlace;


    // محل صدور شناسنامه
    @AutoMap()
    @Column({name: 'IssuePlaceId', nullable: true})
    @ApiProperty()
    issuePlaceId: number;

    @ManyToOne(() => GeographicalPlace, {nullable: true})
    @JoinColumn({name: 'IssuePlaceId'})
    @ApiProperty({type: () => GeographicalPlace,required: false})
    @AutoMap(() => GeographicalPlace)
    issuePlace: GeographicalPlace;


    // تاریخ صدور شناسنامه
    @AutoMap()
    @Column({type: 'date', nullable: true})
    @ApiProperty()
    issueDate: Date;


    // وضعیت تاهل
    @AutoMap()
    @Column({name: 'MarriageStatusId', nullable: true})
    @ApiProperty()
    marriageStatusId: number;

    @ManyToOne(() => BaseInfoItem, {nullable: true})
    @JoinColumn({name: 'MarriageStatusId'})
    @ApiProperty({type: () => BaseInfoItem, required: false})
    @AutoMap(() => BaseInfoItem)
    marriageStatus: BaseInfoItem;


    // وضعیت اشتغال
    @AutoMap()
    @Column({name: 'WorkingStatusId', nullable: true})
    @ApiProperty()
    workingStatusId: number;

    @ManyToOne(() => BaseInfoItem, {nullable: true})
    @JoinColumn({name: 'WorkingStatusId'})
    @ApiProperty({type: () => BaseInfoItem, required: false})
    @AutoMap(() => BaseInfoItem)
    workingStatus: BaseInfoItem;


    // عنوان شغلی
    @AutoMap()
    @Column({length: '1000'})
    @ApiProperty()
    jobTitle: string;


    // وضعیت جسمانی
    @AutoMap()
    @Column({name: 'PhysicalStatusId', nullable: true})
    @ApiProperty()
    physicalStatusId: number;

    @ManyToOne(() => BaseInfoItem, {nullable: true})
    @JoinColumn({name: 'PhysicalStatusId'})
    @ApiProperty({type: () => BaseInfoItem, required: false})
    @AutoMap(() => BaseInfoItem)
    physicalStatus: BaseInfoItem;


    // دین و مذهب
    @AutoMap()
    @Column({name: 'ReligionId', nullable: true})
    @ApiProperty()
    religionId: number;

    @ManyToOne(() => BaseInfoItem, {nullable: true})
    @JoinColumn({name: 'ReligionId'})
    @ApiProperty({type: () => BaseInfoItem, required: false})
    @AutoMap(() => BaseInfoItem)
    religion: BaseInfoItem;


    // تابعیت یا ملیت
    @AutoMap()
    @Column({name: 'NationalityId', nullable: true})
    @ApiProperty()
    nationalityId: number;

    @ManyToOne(() => BaseInfoItem, {nullable: true})
    @JoinColumn({name: 'NationalityId'})
    @ApiProperty({type: () => BaseInfoItem, required: false})
    @AutoMap(() => BaseInfoItem)
    nationality: BaseInfoItem;

    // معدل آخرین مقطع تحصیلی
    @AutoMap()
    @Column({type: 'float', nullable: true})
    @ApiProperty()
    lastDegreeMean: number;


    @AutoMap()
    @Column({type: 'float', nullable: true})
    @ApiProperty()
    height: number;

    @AutoMap()
    @Column({nullable: true})
    @ApiProperty()
    weight: number;

    @AutoMap()
    @Column({nullable: true})
    @ApiProperty()
    childCount: number;

    @AutoMap()
    @Column({name: 'EyeColorId', nullable: true})
    @ApiProperty()
    eyeColorId: number;

    @ManyToOne(() => BaseInfoItem, {nullable: true})
    @JoinColumn({name: 'EyeColorId'})
    @ApiProperty({type: () => BaseInfoItem,required: false})
    @AutoMap(() => BaseInfoItem)
    eyeColor: BaseInfoItem;


    // مرکز فارغ التحصیلی
    @Column({name: "InstituteId", nullable: true})
    @AutoMap()
    @ApiProperty()
    instituteId: number;

    @ManyToOne(() => BaseInfoItem, {nullable: true})
    @JoinColumn({name: 'InstituteId', referencedColumnName: 'id'})
    @AutoMap(() => BaseInfoItem)
    institute: BaseInfoItem;


    @AutoMap()
    @Column({name: 'BloodGroupId', nullable: true})
    @ApiProperty()
    bloodGroupId: number;

    @ManyToOne(() => BaseInfoItem, {nullable: true})
    @JoinColumn({name: 'BloodGroupId'})
    @ApiProperty({type: () => BaseInfoItem,required: false})
    @AutoMap(() => BaseInfoItem)
    bloodGroup: BaseInfoItem;


    @AutoMap()
    @Column({name: 'DutyStatusId', nullable: true})
    @ApiProperty()
    dutyStatusId: number;

    @ManyToOne(() => BaseInfoItem, {nullable: true})
    @JoinColumn({name: 'DutyStatusId'})
    @ApiProperty({type: () => BaseInfoItem,required: false})
    @AutoMap(() => BaseInfoItem)
    dutyStatus: BaseInfoItem;


    @Column()
    @AutoMap()
    @ApiProperty()
    volunteerCode: string;

    @Column()
    @AutoMap()
    @ApiProperty()
    vaccination: string;


    @Column({nullable: true, name: 'isInCommitteeEmdad'})
    @AutoMap()
    @ApiProperty()
    isInCommitteeEmdad: boolean;

    @Column({nullable: true, name: 'IsInBehzisti'})
    @AutoMap()
    @ApiProperty()
    isInBehzisti: boolean;

    @Column({nullable: true, name: 'IsElite'})
    @AutoMap()
    @ApiProperty()
    isElite: boolean;

    @Column({nullable: true, name: 'IsChampion'})
    @AutoMap()
    @ApiProperty()
    isChampion: boolean;

    @Column({nullable: true, name: 'IsHafez'})
    @AutoMap()
    @ApiProperty()
    isHafez: boolean;


    @AutoMap()
    @Column({name: 'BasijStatusId', nullable: true})
    @ApiProperty()
    basijStatusId: number;

    @ManyToOne(() => BaseInfoItem, {nullable: true})
    @JoinColumn({name: 'BasijStatusId'})
    @ApiProperty({type: () => BaseInfoItem,required: false})
    @AutoMap(() => BaseInfoItem)
    basijStatus: BaseInfoItem;

    @AutoMap()
    @Column({nullable: true})
    @ApiProperty()
    basijDuration: number;

}
