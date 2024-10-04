import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { InternshipService } from '../services/internship.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@Controller('internship')
export class InternshipController {
	constructor(private readonly internshipService: InternshipService) {}

	@UseGuards(JwtAuthGuard)
	@Get('details/:code')
	async getInternshipDetailsByStudentCode(@Param('code') code: string) {
		return this.internshipService.getInternshipDetailsByStudentCode(code);
	}
}
