import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from '../entities/student.entity';
import { Repository } from 'typeorm';
import { ProfileService } from 'src/modules/profile/services/profile.service';
import { academicCycleData } from '../seed/academic-cycle.seed';
import { AcademicCycleEntity } from '../entities/academic_cycle.entity';
import { studentData } from '../seed/student.seed';

@Injectable()
export class StudentService implements OnModuleInit {
	constructor(
		@InjectRepository(StudentEntity)
		private readonly studentRepository: Repository<StudentEntity>,
		@InjectRepository(AcademicCycleEntity)
		private readonly academicCycleRepository: Repository<AcademicCycleEntity>,
		private readonly profileService: ProfileService,
	) {}

	async onModuleInit() {
		if (process.env.NODE_ENV !== 'production') {
			await this.seedAcademicCycles();
			await this.seedStudents();
		}
	}

	async seedAcademicCycles() {
		try {
			// Inserta ciclos
			const cycles = academicCycleData.academicCycles;
			const savedAcademicCycles = [];
			for (const cycle of cycles) {
				const cycleEntity = this.academicCycleRepository.create(cycle);
				const savedCycle = await this.academicCycleRepository.save(cycleEntity);
				savedAcademicCycles.push(savedCycle);
				console.log(`Cycle saved: ${cycle.name}`);
			}
			return savedAcademicCycles;
		} catch (error) {
			console.error('Error seeding data:', error);
		}
	}

	async seedStudents() {
		try {
			// Asegúrate de que los perfiles estén guardados
			const profiles = await this.profileService.seedProfiles();
			const students = studentData.students;
			const savedStudents = [];
			for (const studentData of students) {
				// Encuentra el perfil correspondiente por código de perfil
				const profile = profiles.find((p) => p.code === studentData.profile_code);
				if (!profile) {
					console.error(`Profile not found for student with profile code: ${studentData.profile_code}`);
					continue;
				}

				// Encuentra el ciclo académico correspondiente
				const academicCycle = await this.academicCycleRepository.findOne({
					where: { name: studentData.academic_cycle },
				});
				if (!academicCycle) {
					console.error(`Academic cycle not found: ${studentData.academic_cycle}`);
					continue;
				}

				// Crea la entidad de estudiante
				const studentEntity = this.studentRepository.create({
					student_status: studentData.student_status,
					academic_cycle: academicCycle, // Utiliza el nombre correcto
					profile,
				});
				const savedStudent = await this.studentRepository.save(studentEntity);
				savedStudents.push(savedStudent);
				console.log(`Student saved: ${studentData.profile_code}`);
			}
			return savedStudents;
		} catch (error) {
			console.error('Error seeding students:', error);
		}
	}
}
