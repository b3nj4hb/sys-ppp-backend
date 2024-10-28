import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class InternshipDto {
	@ApiProperty({
		description: 'ID of the student',
		example: '12345',
	})
	@IsNotEmpty()
	@IsString()
	student_code: string;

	@ApiProperty({
		description: 'ID of the company',
		example: '67890',
	})
	@IsNotEmpty()
	@IsString()
	companyId: string;

	@ApiProperty({
		description: 'Position of the internship',
		example: 'Software Developer Intern',
	})
	@IsNotEmpty()
	@IsString()
	position: string;

	@ApiProperty({
		description: 'Description of the internship',
		example: 'Developing software solutions',
	})
	@IsNotEmpty()
	@IsString()
	description: string;

	@ApiProperty({
		description: 'Start date of the internship',
		example: '2023-01-01',
	})
	@IsNotEmpty()
	@IsDateString()
	start_date: Date;

	@ApiProperty({
		description: 'End date of the internship',
		example: '2023-06-01',
	})
	@IsNotEmpty()
	@IsDateString()
	end_date: Date;
}
