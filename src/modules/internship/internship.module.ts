import { Module } from '@nestjs/common';
import { InternshipService } from './services/internship.service';
import { InternshipController } from './controllers/internship.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternshipEntity } from './entities/internship.entity';
import { CompanyEntity } from './entities/company.entity';
import { StudentEntity } from '../student/entities/student.entity';
import { ProfileEntity } from '../profile/entities/profile.entity';
import { AcademicCycleEntity } from '../student/entities/academic_cycle.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([InternshipEntity, CompanyEntity, StudentEntity, ProfileEntity, AcademicCycleEntity]), // Añade StudentEntity aquí
	],
	providers: [InternshipService],
	controllers: [InternshipController],
})
export class InternshipModule {}
