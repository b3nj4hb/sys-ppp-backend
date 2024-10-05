import { BadRequestException, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { InternshipDocumentService } from '../services/internship-document.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@Controller('internship-document')
export class InternshipDocumentController {
	constructor(private readonly intershipService: InternshipDocumentService) {}

	@UseGuards(JwtAuthGuard)
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
}
