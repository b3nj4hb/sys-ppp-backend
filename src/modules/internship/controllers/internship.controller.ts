import { Body, Controller, Get, NotFoundException, Param, Patch, UseGuards } from '@nestjs/common';
import { InternshipService } from '../services/internship.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { Post } from '@nestjs/common';
import { InternshipDto } from '../dto/internship.dto';

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

	@UseGuards(JwtAuthGuard)
	@Get('student-id/:profileCode')
	async getStudentIdByProfileCode(@Param('profileCode') profileCode: string) {
		return this.internshipService.getStudentIdByProfileCode(profileCode);
	}

	@UseGuards(JwtAuthGuard)
	@Post('create')
	async createInternship(@Body() internshipDto: InternshipDto) {
		try {
			return await this.internshipService.createInternship(internshipDto);
		} catch (error) {
			throw new NotFoundException('Error creating internship', error.message);
		}
	}

	@UseGuards(JwtAuthGuard)
	@Get('has-pending/:profileCode')
	async hasPendingInternship(@Param('profileCode') profileCode: string): Promise<boolean> {
		return this.internshipService.hasPendingInternship(profileCode);
	}
}
