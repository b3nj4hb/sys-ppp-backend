import { Body, Controller, Get, NotFoundException, Param, Patch, UseGuards } from '@nestjs/common';
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

	@UseGuards(JwtAuthGuard)
	@Patch('status/:studentCode/:internshipId')
	async updateInternshipStatus(@Param('studentCode') studentCode: string, @Param('internshipId') internshipId: string, @Body('status') status: 'pending' | 'approved' | 'rejected') {
		return this.internshipService.updateInternshipStatus(studentCode, internshipId, status);
	}
}
