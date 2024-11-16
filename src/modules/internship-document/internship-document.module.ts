import { Module } from '@nestjs/common';
import { InternshipDocumentService } from './services/internship-document.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternshipDocumentController } from './controllers/internship-document.controller';
import { InternshipDocumentEntity } from './entities/internship-document.entity';
import { ProfileModule } from '../profile/profile.module';
import { StudentModule } from '../student/student.module';
import { DocumentTypeEntity } from './entities/document-type.entity';

@Module({
	imports: [TypeOrmModule.forFeature([InternshipDocumentEntity, DocumentTypeEntity]), ProfileModule, StudentModule],
	providers: [InternshipDocumentService],
	exports: [InternshipDocumentService],
	controllers: [InternshipDocumentController],
})
export class InternshipDocumentModule {}
