import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from '../entities/student.entity';
import { Repository } from 'typeorm';
import { ProfileService } from 'src/modules/profile/services/profile.service';
import { AcademicCycleEntity } from '../entities/academic_cycle.entity';

@Injectable()
export class StudentService {
	constructor(
		@InjectRepository(StudentEntity)
		private readonly studentRepository: Repository<StudentEntity>,
		@InjectRepository(AcademicCycleEntity)
		private readonly academicCycleRepository: Repository<AcademicCycleEntity>,
		private readonly profileService: ProfileService,
	) {}
}
