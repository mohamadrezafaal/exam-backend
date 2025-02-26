import {Column, CreateDateColumn, UpdateDateColumn,} from 'typeorm';
import {BaseEntity} from './base.entity';
import {ApiProperty} from '@nestjs/swagger';

export class AuditedEntity extends BaseEntity {
  @CreateDateColumn()
  @ApiProperty({ required: false, readOnly: true })
  createdDate: Date;

  @ApiProperty()
  @Column()
  createdBy: number;

  @UpdateDateColumn()
  @Column({ nullable: true })
  @ApiProperty({ required: false, readOnly: true })
  modifiedDate: Date;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  modifiedBy: number;

  // @Column({ type: 'timestamp' })
  // rowVersion: Uint8Array;
}
