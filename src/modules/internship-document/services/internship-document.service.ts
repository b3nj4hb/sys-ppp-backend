import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from '../../profile/entities/profile.entity';
import { Repository } from 'typeorm';
import { InternshipDocumentEntity } from '../entities/internship-document.entity';
import { StudentEntity } from '../../student/entities/student.entity';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { R2Client } from '../../../config/cloudflare-r2.config';

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
			.innerJoinAndSelect('internshipDocument.documentType', 'documentType') // Cambiado para reflejar la relación correcta
			.innerJoin('internshipDocument.internship', 'internship')
			.innerJoin('internship.student', 'student')
			.where('internship.id = :internshipId', { internshipId })
			.andWhere('student.id = :studentId', { studentId: student.id })
			.select([
				'internshipDocument.id', // ID del documento en internship_document
				'internshipDocument.approval_status', // Estado de aprobación
				'documentType.name', // Nombre del tipo de documento
				'documentType.description', // Descripción del tipo de documento
				'internshipDocument.document_url', // URL del documento
			])
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

	async uploadDocument(file: Express.Multer.File, internshipId: string, documentTypeId: string): Promise<InternshipDocumentEntity> {
		const documentId = `${Date.now()}-${file.originalname}`;
		const documentUrl = `${process.env.DEV_BUCKET_URL}/${documentId}`;

		// Subir el archivo al bucket de R2
		const command = new PutObjectCommand({
			Bucket: process.env.BUCKET,
			Key: documentId,
			Body: file.buffer,
			ContentType: file.mimetype,
		});
		await R2Client.send(command);

		// Crear el registro en la base de datos
		const internshipDocument = this.internshipDocumentRepository.create({
			document_url: documentUrl,
			internship: { id: internshipId },
			documentType: { id: documentTypeId },
		});
		const savedDocument = await this.internshipDocumentRepository.save(internshipDocument);

		return savedDocument;
	}
}
