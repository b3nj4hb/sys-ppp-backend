import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
			const companyContact: { name_representative?: string; email?: string; phone?: string } = company.company_contact.length > 0 ? company.company_contact[0] : {};
			const { profile, academic_cycle } = internship.student || {};

			return {
				internshipId: internship.id,
				studentCode: code,
				studentName: profile ? `${profile.first_name || ''} ${profile.middle_name || ''} ${profile.last_name || ''} ${profile.second_last_name || ''}`.trim() : 'No profile data',
				studentAvatarUrl: profile ? profile.avatar_url : 'No avatar available',
				companyRepresentative: companyContact.name_representative || 'No representative',
				companyEmail: companyContact.email || 'No email available',
				companyPhone: companyContact.phone || 'No phone available',
				companyName: company.company_name,
				companyDirection: company.direction,
				companyRUC: company.ruc,
				internshipPosition: position,
				internshipStartDate: start_date ? start_date.toISOString().split('T')[0] : 'No start date',
				internshipEndDate: end_date ? end_date.toISOString().split('T')[0] : 'No end date',
				internshipStatus: status || 'No status available',
				academicCycle: academic_cycle ? academic_cycle.name : 'No academic cycle available',
				acadmicCycleDescription: academic_cycle ? academic_cycle.description : 'No description available',
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
}
