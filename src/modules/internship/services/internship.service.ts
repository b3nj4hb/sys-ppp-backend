import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyDto, InternshipDto, StudentDto } from '../dto/internship.dto';
import { StudentEntity } from 'src/modules/student/entities/student.entity';
import { Student } from 'src/modules/student/interfaces/student.interface';
import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';
import { AcademicCycleEntity } from 'src/modules/student/entities/academic_cycle.entity';
import { Company } from '../interfaces/company.interface';
import { CompanyEntity } from '../entities/company.entity';
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

	async getStudentDataByCode(studentCode: string): Promise<StudentDto> {
		// Buscar el perfil del estudiante usando el código y cargar las relaciones necesarias
		const profile = await this.profileRepository.findOne({
			where: { code: studentCode },
			relations: ['student', 'student.academic_cycle'], // Incluimos academic_cycle en las relaciones
		});

		// Verificar si el perfil existe
		if (!profile) {
			throw new NotFoundException(`Student with code "${studentCode}" not found`);
		}

		// Verificar si el perfil tiene un estudiante asociado
		if (!profile.student) {
			throw new NotFoundException(`Student associated with profile code "${studentCode}" not found`);
		}

		// Retornar los datos del estudiante
		const student = profile.student;

		return {
			names: `${profile.first_name} ${profile.middle_name}`,
			surnames: `${profile.last_name} ${profile.second_last_name}`,
			code: profile.code,
			cycle: student.academic_cycle?.name, // Asegúrate de que academic_cycle tenga un campo "name"
		};
	}

	async updateOrCreateCompany(companyData: CompanyDto): Promise<Company> {
		// Buscar la empresa por su nombre
		let company = await this.companyRepository.findOne({ where: { name: companyData.name } });

		if (company) {
			// Actualizar todos los campos con los nuevos datos si la empresa ya existe
			company.contact_person = companyData.contact_person;
			company.academic_degree = companyData.academic_degree;
			company.position = companyData.position;
			company.contact_email = companyData.contact_email;
			company.address = companyData.address;

			// Guardar los cambios en la base de datos
			return await this.companyRepository.save(company);
		}

		// Si la empresa no existe, creamos una nueva entrada
		company = this.companyRepository.create(companyData);
		return await this.companyRepository.save(company);
	}

	// Método para crear una nueva práctica profesional
	async createInternship(internshipDto: InternshipDto): Promise<InternshipEntity> {
		// Crear el registro de prácticas con los datos proporcionados
		const internship = this.internshipRepository.create({
			student: { id: internshipDto.studentId }, // Vinculamos el estudiante por ID
			company: { id: internshipDto.companyId }, // Vinculamos la empresa por ID
			position: internshipDto.position,
			description: internshipDto.description,
			start_date: internshipDto.startDate,
			end_date: internshipDto.endDate,
			hours: internshipDto.hours,
		});

		// Guardar en la base de datos
		return await this.internshipRepository.save(internship);
	}
}
