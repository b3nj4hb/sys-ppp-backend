import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/database.config';
import { ProfileModule } from './modules/profile/profile.module';
import { StudentModule } from './modules/student/student.module';
import { InternshipModule } from './modules/internship/internship.module';
import { EvaluationModule } from './modules/evaluation/evaluation.module';
import { EvaluationStructureModule } from './modules/evaluation-structure/evaluation-structure.module';
import { AuthModule } from './modules/auth/auth.module';
import { CompanyModule } from './modules/company/company.module';
import { InternshipDocumentService } from './modules/internship-document/services/internship-document.service';
import { InternshipDocumentModule } from './modules/internship-document/internship-document.module';

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfig), ProfileModule, StudentModule, InternshipModule, EvaluationModule, EvaluationStructureModule, AuthModule, CompanyModule, InternshipDocumentModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
