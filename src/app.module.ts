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

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfig),
		ProfileModule,
		StudentModule,
		InternshipModule,
		EvaluationModule,
		EvaluationStructureModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
