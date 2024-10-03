import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentDto } from '../dto/internship.dto';
import { StudentEntity } from 'src/modules/student/entities/student.entity';
import { Student } from 'src/modules/student/interfaces/student.interface';
import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';
import { AcademicCycleEntity } from 'src/modules/student/entities/academic_cycle.entity';
import { CompanyEntity } from '../../company/entities/company.entity';
import { InternshipEntity } from '../entities/internship.entity';

@Injectable()
export class InternshipService {
	constructor(
		@InjectRepository(StudentEntity)
		private readonly studentRepository: Repository<Student>,
		@InjectRepository(ProfileEntity)
		private readonly profileRepository: Repository<ProfileEntity>,
		@InjectRepository(AcademicCycleEntity)
		private readonly academicRepository: Repository<AcademicCycleEntity>,
		@InjectRepository(CompanyEntity)
		private readonly companyRepository: Repository<CompanyEntity>,
		@InjectRepository(InternshipEntity)
		private readonly internshipRepository: Repository<InternshipEntity>,
	) {}
}
