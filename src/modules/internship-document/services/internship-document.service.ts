import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from 'src/modules/profile/entities/profile.entity';
import { Repository } from 'typeorm';
import { InternshipDocumentEntity } from '../entities/internship-document.entity';
import { StudentEntity } from 'src/modules/student/entities/student.entity';

@Injectable()
export class InternshipDocumentService {
	constructor(
		@InjectRepository(ProfileEntity)
		private readonly profileRepository: Repository<ProfileEntity>,
		@InjectRepository(InternshipDocumentEntity)
		private readonly internshipDocumentRepository: Repository<InternshipDocumentEntity>,
		@InjectRepository(StudentEntity)
		private readonly studentRepository: Repository<StudentEntity>,
	) {}

	async getDocumentsByInternshipAndStudent(internshipId: string, code: string) {
		// Busca el perfil del estudiante basado en el código
		const studentProfile = await this.profileRepository.findOne({ where: { code } });

		if (!studentProfile) {
			console.log('Student not found with code:', code);
			throw new Error('Student not found');
		}

		// Busca el estudiante que corresponde al perfil
		const student = await this.studentRepository.findOne({
			where: { profile: { id: studentProfile.id } },
		});

		if (!student) {
			console.log('Student entity not found with profile id:', studentProfile.id);
			throw new Error('Student entity not found');
		}

		console.log('Found student:', student);

		// Busca los documentos asociados al internship
		const internshipDocuments = await this.internshipDocumentRepository
			.createQueryBuilder('internshipDocument')
			.innerJoinAndSelect('internshipDocument.document', 'document')
			.innerJoin('internshipDocument.internship', 'internship')
			.innerJoin('internship.student', 'student') // Asegura la relación con el estudiante
			.where('internship.id = :internshipId', { internshipId })
			.andWhere('student.id = :studentId', { studentId: student.id }) // Asegura que esté relacionado con el studentId
			.select(['internshipDocument.approval_status', 'document.title', 'document.description', 'document.file_url'])
			.getMany();

		console.log('Found documents:', internshipDocuments);

		return internshipDocuments;
	}
}
