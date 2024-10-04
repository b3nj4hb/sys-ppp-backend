import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from '../entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
	constructor(
		@InjectRepository(StudentEntity)
		private readonly studentRepository: Repository<StudentEntity>,
	) {}

	async listStudents() {
		const students = await this.studentRepository.find({
			relations: ['profile', 'academic_cycle'],
		});

		return students.map((student) => ({
			studentName: `${student.profile.first_name} ${student.profile.middle_name} ${student.profile.last_name} ${student.profile.second_last_name}`,
			studentCode: student.profile.code,
			studentAvatarUrl: student.profile.avatar_url,
			academicCycle: student.academic_cycle.name,
			academicCycleDescription: student.academic_cycle.description,
			phone: student.profile.phone,
			email: student.profile.email,
		}));
	}
}
