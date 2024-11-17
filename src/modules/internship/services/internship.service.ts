import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentEntity } from '../../student/entities/student.entity';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { AcademicCycleEntity } from '../../student/entities/academic_cycle.entity';
import { CompanyEntity } from '../../company/entities/company.entity';
import { InternshipEntity } from '../entities/internship.entity';
import { InternshipDto } from '../dto/internship.dto';

@Injectable()
export class InternshipService {
	constructor(
		@InjectRepository(StudentEntity)
		private readonly studentRepository: Repository<StudentEntity>,
		@InjectRepository(ProfileEntity)
		private readonly profileRepository: Repository<ProfileEntity>,
		@InjectRepository(AcademicCycleEntity)
		private readonly academicRepository: Repository<AcademicCycleEntity>,
		@InjectRepository(CompanyEntity)
		private readonly companyRepository: Repository<CompanyEntity>,
		@InjectRepository(InternshipEntity)
		private readonly internshipRepository: Repository<InternshipEntity>,
	) {}

	async getInternshipDetailsByStudentCode(code: string) {
		const internships = await this.internshipRepository
			.createQueryBuilder('internship')
			.leftJoinAndSelect('internship.student', 'student')
			.leftJoinAndSelect('student.profile', 'profile')
			.leftJoinAndSelect('student.academic_cycle', 'academicCycle')
			.leftJoinAndSelect('internship.company', 'company')
			.leftJoinAndSelect('company.company_contact', 'company_contact')
			.where('profile.code = :code', { code })
			.getMany();

		if (!internships || internships.length === 0) {
			throw new NotFoundException('Internship not found for this student');
		}

		return internships.map((internship) => {
			const { company, position, start_date, end_date, status } = internship;
			const companyContact: { names?: string; lastname?: string; second_lastname?: string; email?: string; phone?: string } = company.company_contact.length > 0 ? company.company_contact[0] : {};
			const { profile, academic_cycle } = internship.student || {};

			return {
				internshipId: internship.id,
				companyRepresentative: `${companyContact.names || 'No name'} ${companyContact.lastname || ''} ${companyContact.second_lastname || ''}`.trim() || 'No representative',
				companyEmail: companyContact.email || 'No email available',
				companyPhone: companyContact.phone || 'No phone available',
				companyName: company.company_name,
				companyDirection: company.direction,
				companyRUC: company.ruc,
				internshipPosition: position,
				internshipStartDate: start_date ? start_date.toISOString().split('T')[0] : 'No start date',
				internshipEndDate: end_date ? end_date.toISOString().split('T')[0] : 'No end date',
				internshipStatus: status || 'No status available',
			};
		});
	}

	async getInternshipDetails(code: string) {
		const internships = await this.internshipRepository
			.createQueryBuilder('internship')
			.leftJoinAndSelect('internship.student', 'student')
			.leftJoinAndSelect('student.profile', 'profile')
			.leftJoinAndSelect('student.academic_cycle', 'academicCycle')
			.leftJoinAndSelect('internship.company', 'company')
			.leftJoinAndSelect('company.company_contact', 'company_contact')
			.getMany();

		if (!internships || internships.length === 0) {
			throw new NotFoundException('Internship not found for this student');
		}

		return internships.map((internship) => {
			const { company, position, start_date, end_date, status } = internship;
			const companyContact: { names?: string; lastname?: string; second_lastname?: string; email?: string; phone?: string } = company.company_contact.length > 0 ? company.company_contact[0] : {};
			const { profile, academic_cycle } = internship.student || {};

			return {
				internshipId: internship.id,
				companyRepresentative: `${companyContact.names || 'No name'} ${companyContact.lastname || ''} ${companyContact.second_lastname || ''}`.trim() || 'No representative',
				companyEmail: companyContact.email || 'No email available',
				companyPhone: companyContact.phone || 'No phone available',
				companyName: company.company_name,
				companyDirection: company.direction,
				companyRUC: company.ruc,
				internshipPosition: position,
				internshipStartDate: start_date ? start_date.toISOString().split('T')[0] : 'No start date',
				internshipEndDate: end_date ? end_date.toISOString().split('T')[0] : 'No end date',
				internshipStatus: status || 'No status available',
			};
		});
	}

	async updateInternshipStatus(studentCode: string, internshipId: string, status: 'pending' | 'approved' | 'rejected') {
		const internship = await this.internshipRepository
			.createQueryBuilder('internship')
			.leftJoinAndSelect('internship.student', 'student')
			.leftJoinAndSelect('student.profile', 'profile')
			.leftJoinAndSelect('internship.company', 'company')
			.where('profile.code = :code', { code: studentCode })
			.andWhere('internship.id = :id', { id: internshipId })
			.getOne();

		if (!internship) {
			throw new NotFoundException('Internship not found for this student');
		}

		internship.status = status;
		const updatedInternship = await this.internshipRepository.save(internship);

		return {
			student: {
				code: updatedInternship.student.profile.code,
				first_name: updatedInternship.student.profile.first_name,
				last_name: updatedInternship.student.profile.last_name,
			},
			company: {
				company_name: updatedInternship.company.company_name,
				ruc: updatedInternship.company.ruc,
			},
			internship: {
				id: updatedInternship.id,
				status: updatedInternship.status,
			},
		};
	}

	async getStudentIdByProfileCode(profileCode: string): Promise<any> {
		const student = await this.studentRepository.createQueryBuilder('student').leftJoinAndSelect('student.profile', 'profile').where('profile.code = :code', { code: profileCode }).getOne();

		if (!student) {
			throw new NotFoundException('Student not found for this profile code');
		}

		return {
			id: student.id,
			profile: {
				code: student.profile.code,
			},
		};
	}

	async hasPendingInternship(profileCode: string): Promise<boolean> {
		const internships = await this.internshipRepository
			.createQueryBuilder('internship')
			.leftJoinAndSelect('internship.student', 'student')
			.leftJoinAndSelect('student.profile', 'profile')
			.where('profile.code = :code', { code: profileCode })
			.andWhere('internship.status = :status', { status: 'pending' })
			.getMany();

		return internships.length > 0 ? true : false;
	}

	async createInternship(internshipDto: InternshipDto) {
		const { student_code, company_id, position, start_date, end_date, description } = internshipDto;

		const student = await this.getStudentIdByProfileCode(student_code);

		if (!student) {
			throw new NotFoundException('Student not found for this ID');
		}

		const hasPending = await this.hasPendingInternship(student_code);
		if (hasPending) {
			throw new Error('You have a pending internship');
		}

		const company = await this.companyRepository.findOne({ where: { id: company_id } });

		if (!company) {
			throw new NotFoundException('Company not found');
		}

		const internship = this.internshipRepository.create({
			student,
			company,
			position,
			start_date,
			end_date,
			description,
			status: 'pending',
		});

		await this.internshipRepository.save(internship);

		return {
			message: 'Internship created successfully',
			student: {
				code: student.profile.code,
				first_name: student.profile.first_name,
				last_name: student.profile.last_name,
			},
			company: {
				company_name: company.company_name,
				ruc: company.ruc,
			},
			internship: {
				internship_id: internship.id,
				position: internship.position,
				start_date: internship.start_date,
				end_date: internship.end_date,
				description: internship.description,
				hours: internship.hours,
				status: internship.status,
			},
		};
	}
}
