import { Controller, Get, UseGuards } from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@Controller('student')
export class StudentController {
	constructor(private readonly studentService: StudentService) {}

	@UseGuards(JwtAuthGuard)
	@Get('list')
	async listStudents() {
		return this.studentService.listStudents();
	}
}
