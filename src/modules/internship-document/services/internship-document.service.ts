import { Injectable, NotFoundException } from '@nestjs/common';
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
			throw new Error('Student not found');
		}

		// Busca el estudiante que corresponde al perfil
		const student = await this.studentRepository.findOne({
			where: { profile: { id: studentProfile.id } },
		});

		if (!student) {
			throw new Error('Student entity not found');
		}

		// Busca los documentos asociados al internship
		const internshipDocuments = await this.internshipDocumentRepository
			.createQueryBuilder('internshipDocument')
			.innerJoinAndSelect('internshipDocument.document', 'document')
			.innerJoin('internshipDocument.internship', 'internship')
			.innerJoin('internship.student', 'student')
			.where('internship.id = :internshipId', { internshipId })
			.andWhere('student.id = :studentId', { studentId: student.id })
			.select(['document.id', 'internshipDocument.approval_status', 'document.title', 'document.description', 'document.file_url'])
			.getMany();

		return internshipDocuments;
	}

	async updateDocumentStatus(documentId: string, status: 'pending' | 'approved' | 'rejected') {
		console.log('Updating document status for documentId:', documentId, 'with status:', status);

		const internshipDocument = await this.internshipDocumentRepository
			.createQueryBuilder('internshipDocument')
			.leftJoinAndSelect('internshipDocument.document', 'document') // Asegurarse de incluir el documento
			.where('internshipDocument.document_id = :documentId', { documentId }) // Verificar el ID del documento
			.getOne();

		if (!internshipDocument) {
			throw new NotFoundException('Internship document not found');
		}

		internshipDocument.approval_status = status;
		const updatedDocument = await this.internshipDocumentRepository.save(internshipDocument);

		return {
			approval_status: updatedDocument.approval_status,
		};
	}
}
