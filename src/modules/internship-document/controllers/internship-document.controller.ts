import { BadRequestException, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { InternshipDocumentService } from '../services/internship-document.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { Body, Patch } from '@nestjs/common';

@Controller('internship-document')
export class InternshipDocumentController {
	constructor(private readonly intershipService: InternshipDocumentService) {}

	// @UseGuards(JwtAuthGuard)
	@Get()
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

	// @UseGuards(JwtAuthGuard)
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
}
