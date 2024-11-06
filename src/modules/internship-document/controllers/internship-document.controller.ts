import { BadRequestException, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { InternshipDocumentService } from '../services/internship-document.service';
import { Body, Patch } from '@nestjs/common';
import { Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('internship-document')
export class InternshipDocumentController {
	constructor(private readonly intershipService: InternshipDocumentService) {}

	@UseGuards(JwtAuthGuard)
	@Get('student')
	async getDocumentsByInternshipAndStudent(@Query('internship_id') internshipId: string, @Query('code') code: string) {
		// Validación básica de los parámetros
		if (!internshipId || !code) {
			throw new BadRequestException('Missing internship_id or code');
		}
		try {
			return await this.intershipService.getDocumentsByInternshipAndStudent(internshipId, code);
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch('status/:documentId')
	async updateDocumentStatus(@Param('documentId') documentId: string, @Body('status') status: 'pending' | 'approved' | 'rejected') {
		// Validación básica de los parámetros
		if (!status) {
			throw new BadRequestException('Missing status');
		}
		try {
			return await this.intershipService.updateDocumentStatus(documentId, status);
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	@UseGuards(JwtAuthGuard)
	@Post('upload')
	@UseInterceptors(FileInterceptor('file'))
	async uploadDocument(@UploadedFile() file: Express.Multer.File, @Query('internship_id') internshipId: string, @Query('document_type_id') documentTypeId: string) {
		if (!file) {
			throw new BadRequestException('Missing file');
		}
		if (!internshipId) {
			throw new BadRequestException('Missing internship_id');
		}
		if (!documentTypeId) {
			throw new BadRequestException('Missing document_type_id');
		}
		try {
			return await this.intershipService.uploadDocument(file, internshipId, documentTypeId);
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}
}
