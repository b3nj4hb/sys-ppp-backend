import { Module } from '@nestjs/common';
import { InternshipDocumentService } from './services/internship-document.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([InternshipDocumentModule])],
	providers: [InternshipDocumentService],
})
export class InternshipDocumentModule {}
