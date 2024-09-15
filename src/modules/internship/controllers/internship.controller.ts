import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InternshipService } from '../services/internship.service';
import { CompanyDto, InternshipDto } from '../dto/internship.dto';

@Controller('internship')
export class InternshipController {
	constructor(private readonly internshipService: InternshipService) {}

	@Get('/student-by-code/:studentCode')
	async getStudentDataByCode(@Param('studentCode') studentCode: string) {
		return this.internshipService.getStudentDataByCode(studentCode);
	}

	@Post('/company')
	async updateOrCreateCompany(@Body() companyData: CompanyDto) {
		return this.internshipService.updateOrCreateCompany(companyData);
	}

	@Post('/internship')
	async createInternship(@Body() internshipDto: InternshipDto) {
		return this.internshipService.createInternship(internshipDto);
	}
}
