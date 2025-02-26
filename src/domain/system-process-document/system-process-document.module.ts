import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemProcessDocumentRepository } from '@/domain/system-process-document/system-process-document.repository';
import { SystemProcessDocumentService } from '@/domain/system-process-document/system-process-document.service';
import { SystemProcessDocument } from '@/entities/system-process-document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemProcessDocument])],
  controllers: [],
  providers: [
    SystemProcessDocumentRepository,
    SystemProcessDocumentService,
  ],
  exports: [],
})
export class SystemProcessDocumentModule {}
